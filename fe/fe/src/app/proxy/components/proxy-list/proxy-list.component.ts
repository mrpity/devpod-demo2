import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Proxy, ProxyListQueryModel } from '../../models/proxy.interface';
import {
  ProxyStoreState,
  ProxyStoreActions,
  ProxyStoreSelectors
} from '../../store/index';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { HelpersService } from '../../../shared/services/helpers.service';
import { exhaustMap, filter, takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-proxy-list',
  templateUrl: './proxy-list.component.html',
  styleUrls: ['./proxy-list.component.scss']
})

export class ProxyListComponent implements OnInit, OnDestroy {
  paginatorText = this.translate.instant('settings.proxy.list.pagination').toUpperCase();
  data: Proxy[] = [];
  selection = new SelectionModel<number>(true, []);
  selectionOnCurrentPage = new SelectionModel<number[]>(true, []);
  deleteDialogData = {
    title: _('settings.proxy.delete.dialog.title'),
    message: _('settings.proxy.delete.dialog.message'),
    confirmBtn: _('settings.proxy.delete.dialog.deleteBtn'),
    cancelBtn: _('settings.proxy.delete.dialog.cancelBtn'),
    payload: undefined
  };

  addProxyDialogConfig = {
    width: '600px',
    height: '630px',
    autoFocus: false,
    disableClose: true,
    position: {
      top: '100px'
    },
    panelClass: 'proxy-dialog',
    id: 'd_addProxyDialog',
    data: {
      title: _('settings.proxy.add.title'),
      addBtn: _('settings.proxy.add.addBtn'),
      backBtn: _('settings.proxy.add.backBtn'),
      nextBtn: _('settings.proxy.add.nextBtn'),
    }
  };

  proxyDetailsdialogConfig = {
    width: '600px',
    height: '630px',
    autoFocus: false,
    disableClose: true,
    position: {
      top: '100px'
    },
    panelClass: 'proxy-dialog',
    id: 'd_editProxyDialog',
    data: {
      id: null
    }
  };
  proxyList$: Observable<Proxy[]>;
  selectedList$: Observable<number[]>;
  proxyListLength$: Observable<number>;
  private unsubscribe$ = new Subject();
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  clearSelected$: Observable<boolean>;
  listQuery: ProxyListQueryModel;
  displayedColumns: string[] = [
    'select',
    'id',
    'country',
    'city',
    'type',
    'protocol',
    'host',
    'port',
    'description',
    'actions'
  ];

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('deleteActionBtn', { static: false, read: ViewContainerRef }) deleteActionBtn: ViewContainerRef;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private paginatorService: MatPaginatorIntl,
    private translate: TranslateService,
    private store$: Store<ProxyStoreState.State>,
    public helpers: HelpersService,
  ) { }

  ngOnInit() {
    this.paginatorService.itemsPerPageLabel = this.paginatorText;

    this.selectedList$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getSelectedProxies
      )
    );

    this.proxyList$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getProxies
      )
    );

    this.proxyList$.subscribe((data: Proxy[]) => {
      this.data = data;
    }
    );

    this.proxyListLength$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getProxiesTotal
      )
    );
    this.isLoading$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getIsLoading
      )
    );

    this.clearSelected$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getClearSelected
      )
    );

    this.clearSelected$.pipe(
      filter(Boolean)
    ).subscribe(() => {
      this.deleteDialogData.payload.forEach(id => this.selection.deselect(id));
      this.updatePageSelectedItems();
      this.store$.dispatch(
        new ProxyStoreActions.ProxyListActions.ResetSelected()
      );
    });

    this.store$.pipe(
      select(
        ProxyStoreSelectors.getListQuery
      )
    ).subscribe(data => {
      return this.listQuery = data;
    });

    this.store$.dispatch(
      new ProxyStoreActions.ProxyListActions.FetchDataByDefault()
    );
  }


  ngOnDestroy() {
    this.store$.dispatch(
      new ProxyStoreActions.ProxyListActions.ClearListQuery()
    );
  }

  /**
   * Handle pagination change
   * @param ev - event param with pagination data
   */
  paginationChange(ev: any) {
    this.store$.dispatch(
      new ProxyStoreActions.ProxyListActions.ChangePagination({
        pageNumber: ev.pageIndex,
        pageSize: ev.pageSize
      })
    );
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
      new ProxyStoreActions.ProxyListActions.ChangeSorting({ sortBy })
    );
  }

  isAllSelected() {
    const numSelected = this.selectionOnCurrentPage.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  toggleAllAction(actionType: string) {
    this.data.forEach(row => {
      this.selection[actionType](row.id);
      this.selectionOnCurrentPage[actionType](row.id);
    });
  }

  masterToggle() {
    (this.isAllSelected())
      ? this.toggleAllAction('deselect')
      : this.toggleAllAction('select');
  }

  deleteProxy(proxyList = this.selection.selected) {
    this.deleteDialogData.payload = proxyList;
    this.store$.dispatch(
      new ProxyStoreActions.ProxyDeleteActions.OpenDeleteDialog(this.deleteDialogData)
    );
  }

  private updatePageSelectedItems() {
    this.selectionOnCurrentPage.clear();
    this.data.forEach((item: any): void => {
      if (this.selection.isSelected(item.id)) {
        this.selectionOnCurrentPage.select(item.id);
      }
    });
  }

  openDetails(event, id) {
    if (event.target.name === 'delete') {
      return;
    }

    this.proxyDetailsdialogConfig.data.id = id;

    this.store$.dispatch(
      new ProxyStoreActions.ProxyDetailsActions.OpenDetailsDialog(this.proxyDetailsdialogConfig)
    );
  }

  add() {
    this.store$.dispatch(
      new ProxyStoreActions.ProxyAddActions.OpenAddDialog(this.addProxyDialogConfig)
    );
  }
}
