import {AfterViewChecked, AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  ProxyStoreState,
  ProxyStoreActions,
  ProxyStoreSelectors
} from '../../store/index';
import {HelpersService} from '../../../shared/services/helpers.service';
import {ProxyDetailsModel, ProxyUpdateModel} from '../../models/proxy.interface';
import {debounceTime, distinctUntilChanged, filter, skip} from 'rxjs/operators';

@Component({
  selector: 'app-proxy-add-dialog',
  templateUrl: './proxy-edit-dialog.component.html',
  styleUrls: ['./proxy-edit-dialog.component.scss']
})
export class ProxyEditDialogComponent implements OnInit, OnDestroy {
  editProxyForm: FormGroup;
  submitted = false;
  userData: ProxyUpdateModel;
  data: any;
  data$: Observable<ProxyDetailsModel>;
  startValues: ProxyDetailsModel;
  loginPassPattern = new RegExp(/^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]*$/);

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<ProxyEditDialogComponent>,
    private formBuilder: FormBuilder,
    private store$: Store<ProxyStoreState.State>,
    public helpers: HelpersService
  ) {}

  ngOnInit() {
    this.createForm();
    this.data$ = this.store$.pipe(
      select(
        ProxyStoreSelectors.getSelectedDetails
      ),
      filter(data => !!data)
    );

    this.data$.subscribe((result: ProxyDetailsModel): void => {
      this.startValues = result;
      this.editProxyForm.patchValue(this.startValues);
    });

    this.store$.dispatch(
      new ProxyStoreActions.ProxyDetailsActions.LoadDetailsRequest({ id: this.dialogData.id })
    );
  }

  private createForm() {
    this.editProxyForm = this.formBuilder.group({
      id: [''],
      country: ['', { validators: [Validators.required] }],
      city: ['', { validators: [] }],
      type: ['', { validators: [] }],
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

  get f() {
    return this.editProxyForm.controls;
  }

  save() {
    this.submitted = true;
    this.helpers.validateAllFormFields(this.editProxyForm);
    if (this.editProxyForm.invalid) {
      return;
    }
    if (this.isFormChanged()) {
      return this.dialogRef.close(this.userData);
    }
    return this.dialogRef.close();
  }

  isFormChanged() {
    if (this.editProxyForm.touched && this.editProxyForm.dirty) {
      const userData = this.editProxyForm.getRawValue();
      const startValues = this.helpers.cleanEmptyKeys(this.startValues);
      this.userData = this.helpers.cleanEmptyKeys(userData);
      if (!this.helpers.isObjectEqual(this.userData, startValues)) {
        return true;
      }
    }
  }

  ngOnDestroy() {
    this.store$.dispatch(
      new ProxyStoreActions.ProxyDetailsActions.ClearProxyData()
    );
  }
}
