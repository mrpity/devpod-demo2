import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { HelpersService } from '@app/shared/services/helpers.service';
import { Subject } from 'rxjs';
import { CrawlingTypesService } from '@app/data-source/services/crawling-types.service';
import { FormMode, DataSourceType } from '../data-source.enums';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataSourceStoreState, DataSourceStoreActions, DataSourceStoreSelectors } from '../store';
import { Store, select } from '@ngrx/store';
import { DataSourceCreate, ProxyRegionInterface } from '../models/data-source-crud.model';

_('dataSource.addDataSource.successMsg');

@Component({
  selector: 'app-data-source-add',
  templateUrl: './data-source-add.component.html',
  styleUrls: ['./data-source-add.component.scss']
})
export class DataSourceAddComponent implements OnInit, OnDestroy {
  /**
   * Public variables
   */
  addDataSourceForm: FormGroup;
  isDirty = false;
  currentType = DataSourceType.WEB_GENERAL;
  proxyCountryList: ProxyRegionInterface[];
  isLoadingResults = false;
  failedGateway = false;
  formMode = FormMode.ADD;
  urlPattern = new RegExp(/^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\..{2,20}(:[0-9]{1,5})?(\/.*)?$/);
  profileIdPattern = new RegExp(/([0-9a-zA-Z\.])/);
  // tslint:disable-next-line
  phoneEmailPattern = new RegExp(/(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|(^[\+]?[\s]?[0-9]?[0-9]{1}?[\s]?[(]?([-\s]?[0-9]?[-\s]?){1,3}[0-9]{1}?[\s]?[0-9]{1}?[\s]?[)]?[-\s]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}?[-\s\.]?[0-9]{1,17}?$)/);

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
    public crawling: CrawlingTypesService
  ) { }

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
    return this.addDataSourceForm.controls;
  }

  createForm() {
    this.addDataSourceForm = this.formBuilder.group({
      automationRules: [{ value: [], disabled: false }],
      enabled: [false, { disabled: false }],
      proxyCountryCode: ['', { disabled: false }],
      type: [this.currentType, { disabled: false }],
      url: ['', { disabled: false, validators: [
        Validators.required,
        Validators.maxLength(8192),
        Validators.minLength(4),
        Validators.pattern(this.urlPattern)
      ] }],
      profileId: ['', { disabled: false, validators: [
        Validators.required,
        Validators.pattern(this.profileIdPattern)
      ] }],
      depth: [1, { disabled: false }],
      crawlMedia: [false, { disabled: false }],
      proxyCity: ['', { disabled: false }],
    });
    this.subscribeToFormChanges();
  }

  /**
   * Dispatch Data Source create request
   */
  create(data: DataSourceCreate) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceCrudActions.CreateRequest(data)
    );
  }

  /**
   * Dispatch Data Source create failed
   */
  createFailed(data): void {

  }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  openConfirmDialog() {
    // if (this.addDataSourceForm.touched && this.addDataSourceForm.dirty) {
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

  private subscribeToFormChanges() {
    this.addDataSourceForm.controls.type.valueChanges.pipe(
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
