import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSourceService } from '../services/data-source.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { HelpersService } from '@app/shared/services/helpers.service';
import { Subject } from 'rxjs';
import { CrawlingTypesService } from '@app/data-source/services/crawling-types.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormMode, DataSourceType } from '../data-source.enums';
import { DataSourceStoreActions, DataSourceStoreState, DataSourceStoreSelectors } from '../store';
import { Store, select } from '@ngrx/store';
import { ProxyRegionInterface } from '../models/data-source-crud.model';

_('dataSource.addDataSource.successMsg');
_('dataSource.addDataSource.errorsMsg');

@Component({
  selector: 'app-data-source-import',
  templateUrl: './data-source-import.component.html',
  styleUrls: ['./data-source-import.component.scss']
})
export class DataSourceImportComponent implements OnInit, OnDestroy {
  /**
   * Public variables
   */
  importDataSourceForm: FormGroup;
  isDirty = false;
  currentType = DataSourceType.WEB_GENERAL;
  depths = [1, 2];
  types = Object.keys(DataSourceType);
  proxyCountryList: ProxyRegionInterface[];
  isLoadingResults = false;
  failedGateway = false;
  formMode = FormMode.IMPORT;

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
    private dialog: MatDialog,
    private store$: Store<DataSourceStoreState.State>,
    public helpers: HelpersService,
    public crawling: CrawlingTypesService) {
  }

  ngOnInit() {
    this.isLoadingResults = true;

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getAvailableProxyRegions)
    ).subscribe(data => {
      this.proxyCountryList = data;
      this.isLoadingResults = false;
      this.createForm();
    }, () => {
      this.isLoadingResults = false;
      this.failedGateway = true;
    });

    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceDetailsActions.LoadProxiesRequest()
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get f() {
    return this.importDataSourceForm.controls;
  }

  createForm() {
    this.importDataSourceForm = this.formBuilder.group({
      proxyCountryCode: [{ value: '', disabled: false }],
      proxyCity: [{ value: '', disabled: false }],
      type: [{ value: this.currentType, disabled: false }],
      depth: [{ value: 1, disabled: false }],
      resources: [{ value: [], disabled: false }, Validators.required],
    });
    this.subscribeToFormChanges();
  }

  /**
   * Dispatch Data Source import request
   */
  import(data) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceCrudActions.CreateInBatchRequest(data)
    );
  }

  /**
   * Dispatch Data Source import failed
   */
  importFailed(data): void {

  }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  openConfirmDialog() {
    // if (this.importDataSourceForm.touched && this.importDataSourceForm.dirty) {
    this._confirmDialogRef = this.dialog.open(ConfirmationPopupComponent, this._confirmDialogConfig);
    this._confirmDialogRef.afterClosed()
      .pipe(
        filter(Boolean)
      ).subscribe(() => {
        this._confirmDialogRef = null;
        this.navigateToList();
      });
    // } else {
    //   this.navigateToList();
    // }
  }

  /**
   * Cancel Data Source creating
   */
  cancelDataSourceCreate(): void {
    // this.router.navigate(['app/data-source/list']);
    this.openConfirmDialog();
  }

  makeFormModifications() {
    if (this.currentType !== DataSourceType.WEB_GENERAL) {
      this.importDataSourceForm.get('proxyCountryCode').disable();
      this.importDataSourceForm.get('proxyCity').disable();
    }
  }

  private subscribeToFormChanges() {
    this.importDataSourceForm.controls.type.valueChanges.pipe(
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
}
