import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { HelpersService } from '../../shared/services/helpers.service';
import { CrawlingTypesService } from '../services/crawling-types.service';
import { FormMode, DataSourceType } from '../data-source.enums';
import { Subject } from 'rxjs';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataSourceStoreState, DataSourceStoreActions, DataSourceStoreSelectors } from '../store';
import { Store, select } from '@ngrx/store';

_('dataSource.editDataSource.successMsg');
_('dataSource.addDataSource.errorsMsg');

@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss']
})
export class DataSourceEditComponent implements OnInit, OnDestroy {
  /**
   * Public variables
   */
  editDataSourceForm: FormGroup;
  isDirty = false;
  currentType = DataSourceType.WEB_GENERAL;
  proxyRegions: any[];
  isLoadingResults = false;
  failedGateway = false;
  data: any;
  dataSource: any;
  dataSourceId: number;
  formMode = FormMode.EDIT;

  /**
   * Private variables
   */
  private _unsubscribe$ = new Subject();
  private _confirmDialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  private _confirmDialogConfig = {
    panelClass: 'mat-custom-dialog',
    id: 'd_confirmDialog',
    data: {
      title: _('dataSource.addDataSource.confirmDialog.title'),
      message: _('dataSource.addDataSource.confirmDialog.message'),
      confirmBtn: _('dataSource.addDataSource.confirmDialog.discardBtn'),
      cancelBtn: _('dataSource.addDataSource.confirmDialog.cancelBtn'),
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store$: Store<DataSourceStoreState.State>,
    public helpers: HelpersService,
    public crawling: CrawlingTypesService
  ) {}

  ngOnInit() {
    this.isLoadingResults = true;

    this.dataSourceId = this.route.snapshot.params.id;
    if (!this.dataSourceId || isNaN(this.dataSourceId)) {
      this.navigateToList();
      return;
    }

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getDetailsForEdit)
    ).subscribe((data) => {
      if (data && data.generalInfo && data.proxies) {
        this.dataSource = data.generalInfo;
        this.currentType = data.generalInfo.type;

        // Set proxyCountryList by default
        this.proxyRegions = [ ...data.proxies ];

        // Init form
        this.createForm();
        this.isLoadingResults = false;
      }
    });

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getFailedGateway)
    ).subscribe((data) => {
      this.failedGateway = data;
      if (data) {
        this.isLoadingResults = false;
      }
    });

    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceDetailsActions.LoadDataSourceAndProxiesRequest(this.dataSourceId)
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get f() {
    return this.editDataSourceForm.controls;
  }

  createForm() {
    this.editDataSourceForm = this.formBuilder.group({
      automationRules: [{ value: this.dataSource.automationRules, disabled: false }],
      enabled: [{ value: this.dataSource.enabled, disabled: false }],
      proxyCountryCode: [{ value: this.dataSource.proxyCountryCode, disabled: false }],
      type: [{ value: this.dataSource.type, disabled: false }],
      url: [{ value: this.dataSource.url, disabled: false }],
      profileId: [{ value: this.dataSource.profileId, disabled: false }],
      depth: [{ value: this.dataSource.depth, disabled: false }],
      crawlMedia: [{ value: this.dataSource.crawlMedia, disabled: false }],
      proxyCity: [{ value: this.dataSource.proxyCity, disabled: false }],
      id: [{ value: this.dataSource.id, disabled: false }],
    });
    this.subscribeToFormChanges();
  }

  /**
   * Dispatch Data Source create request
   */
  update(data) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceCrudActions.UpdateRequest(data)
    );
  }

  /**
   * Dispatch Data Source create failed
   */
  updateFailed(data): void {

  }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  openConfirmDialog() {
    // if (this.editDataSourceForm.touched && this.editDataSourceForm.dirty) {
    this._confirmDialogRef = this.dialog.open(ConfirmationPopupComponent, this._confirmDialogConfig);
    this._confirmDialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this._unsubscribe$)
      ).subscribe(() => {
        this._confirmDialogRef = null;
        this.navigateToDetails();
      });
    // } else {
    //   this.navigateToDetails();
    // }
  }

  /**
   * Cancel Data Source creating
   */
  cancelDataSourceEdit(): void {
    // this.navigateToDetails();
    this.openConfirmDialog();
  }

  private subscribeToFormChanges() {
    this.editDataSourceForm.controls.type.valueChanges.pipe(
      debounceTime(100),
      filter(Boolean),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe$)
    ).subscribe((value: DataSourceType) => {
      this.currentType = value;
      this.createForm();
    });
  }

  private navigateToList() {
    this.router.navigate(['app/data-source/list']);
  }

  private navigateToDetails() {
    this.router.navigate(['../../details', this.dataSourceId], { relativeTo: this.route });
  }
}
