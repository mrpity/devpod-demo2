import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataSourceService } from '@app/data-source/services/data-source.service';
import { noop, Observable, Subject } from 'rxjs';
import { exhaustMap, filter, finalize, takeUntil, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataSourceStoreActions, DataSourceStoreSelectors, DataSourceStoreState } from '@app/data-source/store/';
import { select, Store } from '@ngrx/store';
import { DataSource, DataSourceListQuery, DataSourceListStatuses, DataSourceFiltersModel } from '@app/data-source/models/data-source.model';

@Component({
  selector: 'app-data-source-list',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.scss'],
})
export class DataSourceListComponent implements OnInit, OnDestroy {

  /**
   * Observables
   * - Getting ASYNC data from Store
   */
  dataSourceListLength$: Observable<number>;
  isLoading$: Observable<boolean>;
  /**
   * Class static variables
   * - SYNC data from Store
   * - some other variables
   */
  displayedColumns = [
    'select',
    'id',
    'status',
    'type',
    'url',
    'createdAt',
    'crawledAt',
    'crawledBy',
    'owner',
    'actions',
  ];
  listQuery: Partial<DataSourceListQuery>;
  dataSourceList: DataSource[];
  listStatuses: DataSourceListStatuses;

  selection = new SelectionModel<number>(true, []);
  selectionOnCurrentPage = new SelectionModel<number[]>(true, []);
  isLoadingResults = true;
  failedGateway = false;
  deleteSingleStream = new Subject();
  deleteSnackBarStream$ = new Subject();
  singleIdForDeletion: number;
  dialogSubscription: any;
  dialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  resultRef: MatSnackBarRef<SnackBarComponent>;
  private unsubscribe$ = new Subject();

  defaultDialogConfig = {
    panelClass: 'mat-custom-dialog',
    id: 'd_confirmDialog',
    data: {
      title: _('dataSource.list.modalDeleteMessage'),
      message: _('dataSource.list.deleteMessage'),
      confirmBtn: _('dataSource.addDataSource.deleteBtn'),
      cancelBtn: _('dataSource.addDataSource.cancelBtn'),
    }
  };

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;
  @ViewChild(MatSnackBar, { static: false }) public snackBarChild: MatSnackBar;
  @ViewChild('deleteSnackBar', { static: false }) public deleteSnackBar: ElementRef;
  @ViewChild('container', { static: false, read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private store$: Store<DataSourceStoreState.State>,
    private dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public helpers: HelpersService
  ) { }

  ngOnInit() {
    /**
     * Get ASYNC data from Store through selectors
     */
    this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(DataSourceStoreSelectors.getDataSources)
    ).subscribe(data => this.dataSourceList = data);

    this.dataSourceListLength$ = this.store$.pipe(
      select(DataSourceStoreSelectors.getDataSourcesTotal)
    );

    this.store$.pipe(
      select(
        DataSourceStoreSelectors.getListQuery
      )
    ).subscribe(data => {
      this.listQuery = data;
    });

    this.isLoading$ = this.store$.pipe(
      select(DataSourceStoreSelectors.getIsLoading)
    );

    this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(DataSourceStoreSelectors.getListStatuses)
    ).subscribe((data) => {
      this.listStatuses = data;
    });

    /**
     * Load data from server by dispatching an action
     */
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceListActions.FetchDataByDefault()
    );

    this.deleteSingleStream.pipe(
      exhaustMap((id: number) => {
        this.singleIdForDeletion = id;
        this.dialogRef = this.dialog.open(ConfirmationPopupComponent, this.defaultDialogConfig);
        return this.dialogRef.afterClosed();
      }),
      filter(result => !!result),
      tap(() => this.deleteDataSource([this.singleIdForDeletion]))
    ).subscribe(() => this.singleIdForDeletion = null);


    this.deleteSnackBarStream$.pipe(
      exhaustMap((id) => {
        this.dialogRef = this.dialog.open(ConfirmationPopupComponent, this.defaultDialogConfig);
        return this.dialogRef.afterClosed();
      }),
      filter(result => !!result),
      tap(id => this.deleteDataSource(this.selection.selected))
    ).subscribe(noop);
  }

  isAllSelected() {
    const numSelected = this.selectionOnCurrentPage.selected.length;
    const numRows = this.dataSourceList.length;
    return numSelected === numRows;
  }

  toggleAllAction(actionType: string) {
    this.dataSourceList.forEach(row => {
      this.selection[actionType](row.id);
      this.selectionOnCurrentPage[actionType](row.id);
    });
  }

  masterToggle() {
    (this.isAllSelected())
      ? this.toggleAllAction('deselect')
      : this.toggleAllAction('select');
  }

  openAddDialog() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  openImportPage() {
    this.router.navigate(['../import'], { relativeTo: this.route });
  }

  private deleteDataSource(idList) {
    this.dataSourceService.delete(idList)
      .pipe(
        finalize(() => {
          this.store$.dispatch(
            new DataSourceStoreActions.DataSourceListActions.FetchDataByDefault()
          );
        })
      ).subscribe(() => {
        idList.forEach(id => this.selection.deselect(id));
        idList.forEach(id => this.selectionOnCurrentPage.deselect(id));
        this.dialogSubscription = this.helpers.showSuccessSnackBar(this.helpers.getDeleteDataSourceMessage(idList, 'success'));

      }, error => {
        this.helpers.showErrorSnackBar(this.helpers.getDeleteDataSourceMessage(idList, 'fail', error));
        this.isLoadingResults = false;
      });
  }

  openDetails(event, id) {
    if (event.target.name === 'delete') {
      return;
    }
    this.store$.dispatch(new DataSourceStoreActions.DataSourceDetailsActions.ClearSelectedDataSource());
    this.router.navigate(['../details', id], { relativeTo: this.route });
  }

  /**
   * Handle pagination change
   * @param ev - event param with pagination data
   */
  paginationChange(ev: any) {
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceListActions.ChangePagination({
        pageNumber: ev.pageIndex,
        pageSize: ev.pageSize
      })
    );
  }

  getImageStatusSource(id) {
    return `assets/img/status/${this.listStatuses[id].toLowerCase()}.png`;
  }

  /**
   * Sort data in list
   * @param name - name of table column for sorting
   */
  sortData(name: string) {
    const sortBy = {
      ...this.listQuery.sortBy
    };

    if (sortBy.field === name) {
      sortBy.asc = !sortBy.asc;
    } else {
      sortBy.field = name;
      sortBy.asc = true;
    }

    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceListActions.ChangeSorting({ sortBy })
    );
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    if (this.resultRef) {
      this.resultRef.dismiss();
    }

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceListActions.ClearListQuery()
    );
  }
}
