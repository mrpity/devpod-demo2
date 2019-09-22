import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserStoreState, UserStoreActions, UserStoreSelectors } from '../store';
import { User, FormMode } from '../models/user.model';
import { UserRoles } from '../user.enums';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  /**
   * Public variables
   */
  createUserForm: FormGroup;
  isDirty = false;
  failedGateway = false;
  formMode = FormMode.ADD;
  userRoles = Object.keys(UserRoles);
  // tslint:disable-next-line
  emailPattern = new RegExp(/(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|(^[\+]?[\s]?[0-9]?[0-9]{1}?[\s]?[(]?([-\s]?[0-9]?[-\s]?){1,3}[0-9]{1}?[\s]?[0-9]{1}?[\s]?[)]?[-\s]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}?[-\s\.]?[0-9]{1,17}?$)/);

  /**
   * Private variables
   */
  private _unsubscribe$ = new Subject();
  private _confirmDialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  private _confirmDialogConfig = {
    panelClass: 'mat-custom-dialog',
    id: 'd_confirmDialog',
    data: {
      title: _('user.confirmDialog.discardChangesTitle'),
      message: _('user.confirmDialog.discardChangesMessage'),
      confirmBtn: _('user.confirmDialog.discardBtn'),
      cancelBtn: _('user.confirmDialog.cancelBtn'),
    }
  };

  isLoading$: Observable<boolean> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getIsLoading)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private store$: Store<UserStoreState.State>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get f() {
    return this.createUserForm.controls;
  }

  createForm() {
    this.createUserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      email: ['', { validators: [
        Validators.minLength(4),
        Validators.maxLength(8192),
        Validators.pattern(this.emailPattern)
      ] }],
      role: ['']
    });
  }

  /**
   * Dispatch User create request
   */
  create(userDetails: User) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new UserStoreActions.UserCrudActions.CreateRequest(userDetails)
    );
  }

  /**
   * Dispatch User create failed
   */
  createFailed(): void { }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  openConfirmDialog() {
    // if (this.edituserForm.touched && this.edituserForm.dirty) {
    this._confirmDialogRef = this.dialog.open(ConfirmationPopupComponent, this._confirmDialogConfig);
    this._confirmDialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this._unsubscribe$)
      ).subscribe(() => {
        this._confirmDialogRef = null;
        this.navigateToList();
      });
    // } else {
    //   this.navigateToDetails();
    // }
  }

  /**
   * Cancel Data Source creating
   */
  cancelUserEdit(): void {
    // this.navigateToDetails();
    this.openConfirmDialog();
  }

  private navigateToList() {
    this.router.navigate(['app/user/list']);
  }
}
