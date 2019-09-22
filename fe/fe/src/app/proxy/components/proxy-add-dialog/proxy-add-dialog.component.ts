import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { ProxyStoreState, ProxyStoreActions, ProxyStoreSelectors } from '../../store/index';
import { ProxyProtocol } from '../../models/proxy-protocol.enum';
import { HelpersService } from '@app/shared/services/helpers.service';
import { ProxyAddModel } from '../../models/proxy.interface';
import { TranslateService } from '@ngx-translate/core';
import { PredefinedProxyTypes, CountryCodes } from '../../proxy.enums';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import * as actions from '../../store/actions/index';

_('settings.proxy.add.findLocation.noCountry');
_('settings.proxy.add.findLocation.error');

@Component({
  selector: 'app-proxy-add-dialog',
  templateUrl: './proxy-add-dialog.component.html',
  styleUrls: ['./proxy-add-dialog.component.scss']
})
export class ProxyAddDialogComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();
  private _actionSubscriber = new Subscription();
  addProxyForm: FormGroup = null;
  submitted = false;
  userData: ProxyAddModel = null;
  countryList$: Observable<string[]>;
  typeList: string[];
  typeListFiltered$: Observable<string[]>;
  protocols: string[] = Object.keys(ProxyProtocol);
  loginPassPattern = new RegExp(/^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]*$/);
  predefinedProxyTypes = Object.keys(PredefinedProxyTypes);
  canSave = false;
  currentFormValue = {};
  isCountryLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProxyAddDialogComponent>,
    private formBuilder: FormBuilder,
    private store$: Store<ProxyStoreState.State>,
    private actionsSubject: ActionsSubject, // Subscribe on action inside component
    public helpers: HelpersService,
    public translate: TranslateService
  ) {
    this._actionSubscriber = this.actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case actions.ProxyAddActions.ActionTypes.FIND_LOCATION_BY_HOST_SUCCESS: {
          if (action.payload && action.payload.countryCode && action.payload.countryCode !== CountryCodes.UNDEFINED) {
            this.isCountryLoading = false;
            this.canSave = true;
            this.currentFormValue = { ...this.currentFormValue, city: action.payload['city'], country: action.payload['country'] };
            this.addProxyForm.patchValue({
              ...action.payload
            });
          } else {
            this.canSave = false;
            this.isCountryLoading = false;
            this.checkEmptyCredentials();
            this.helpers.showErrorSnackBar('settings.proxy.add.findLocation.noCountry', { duration: 5000 });
          }
          break;
        }
        case actions.ProxyAddActions.ActionTypes.FIND_LOCATION_BY_HOST_FAILURE: {
          this.canSave = false;
          this.isCountryLoading = false;
          this.checkEmptyCredentials();
          this.helpers.showErrorSnackBar('settings.proxy.add.findLocation.error', { duration: 5000 });
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.createForm();

    this.countryList$ = this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(
        ProxyStoreSelectors.getCountries
      )
    );

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(
        ProxyStoreSelectors.getTypes
      )
    ).subscribe(res => {
      this.typeList = this.predefinedProxyTypes.concat(res.filter(item => !PredefinedProxyTypes[item]));
      this.typeListFiltered$ = this.f.type.valueChanges
        .pipe(
          startWith(''),
          map(type => type ? this._filter(this.typeList, type) : this.typeList.slice())
        );
    });

    this.store$.dispatch(
      new ProxyStoreActions.ProxyAddActions.GetProxySettingsRequest()
    );
  }

  ngOnDestroy() {
    this._actionSubscriber.unsubscribe();
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private createForm() {
    this.addProxyForm = this.formBuilder.group({
      country: [''],
      city: [''],
      type: ['', {}],
      url: this.formBuilder.group({
        protocol: ['', { validators: [Validators.required] }],
        host: ['', { validators: [Validators.required] }],
        port: ['', { validators: [Validators.required, Validators.min(0), Validators.max(65535)] }],
      }),
      credentials: this.formBuilder.group({
        login: ['', { validators: [Validators.pattern(this.loginPassPattern)] }],
        password: ['', { validators: [Validators.pattern(this.loginPassPattern)] }],
      }),
      description: ['', { validators: [Validators.maxLength(255)] }]
    });
  }

  private _filter(data, value: string): string[] {
    const filterValue = value.toLowerCase();
    return data.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  get f() {
    return this.addProxyForm.controls;
  }

  add(): void {
    this.submitted = true;
    this.helpers.validateAllFormFields(this.addProxyForm);
    if (this.addProxyForm.invalid) {
      return;
    }
    this.checkEmptyCredentials();
    this.userData = this.helpers.cleanEmptyKeys(this.addProxyForm.value);
    this.dialogRef.close(this.userData);
  }

  back(): void {
    this.canSave = false;
    this.createForm();
    this.addProxyForm.patchValue({ ...this.currentFormValue });
  }

  checkEmptyCredentials(): void {
    const login = this.addProxyForm.get(['credentials', 'login']);
    const password = this.addProxyForm.get(['credentials', 'password']);
    const loginValue = this.addProxyForm.get(['credentials', 'login']).value;
    if (loginValue === '-') {
      login.reset();
      password.reset();
    } else if (!loginValue) {
      login.setValue('-');
      password.setValue('-');
    }
  }

  next(): void {
    this.helpers.validateAllFormFields(this.addProxyForm);
    this.submitted = true;
    if (this.addProxyForm.valid) {
      this.canSave = true;
      this.submitted = false;
      const formValue = this.addProxyForm.value;
      if (this.helpers.isObjectEqual(this.currentFormValue, formValue)) {
        this.checkEmptyCredentials();
        return;
      }
      this.findProxyLocation();
    }
  }

  findProxyLocation() {
    this.currentFormValue = this.addProxyForm.value;
    const proxyUrl = this.addProxyForm.get(['url']).value;
    const credentials = this.addProxyForm.get(['credentials']).value;
    const proxyCredentials = credentials.login ? credentials : null;
    this.isCountryLoading = true;
    this.store$.dispatch(
      new ProxyStoreActions.ProxyAddActions.FindLocationByHostRequest({ proxyUrl, proxyCredentials })
    );
    this.checkEmptyCredentials();
  }
}
