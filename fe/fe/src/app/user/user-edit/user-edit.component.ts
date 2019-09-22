import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, takeUntil, take } from 'rxjs/operators';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserStoreState, UserStoreSelectors, UserStoreActions } from '../store';
import { User, FormMode } from '../models/user.model';
import { UserRoles } from '../user.enums';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  /**
   * Public variables
   */
  editUserForm: FormGroup;
  isDirty = false;
  failedGateway = false;
  user: any;
  userId: number;
  formMode = FormMode.EDIT;
  userRoles = Object.keys(UserRoles);

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

  getUser$: Observable<User> = this.store$.pipe(
    take(1),
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getOneUser)
  );

  userDetails$: Observable<User> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getOneUser)
  );

  isLoading$: Observable<boolean> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getIsLoading)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store$: Store<UserStoreState.State>
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    if (!this.userId || isNaN(this.userId)) {
      this.navigateToList();
      return;
    }

    this.getUser$.subscribe((data) => {
      if (!data) {
        this.store$.dispatch(
          new UserStoreActions.UserCrudActions.LoadDetailsRequest({ id: this.userId })
        );
      }
    });

    this.userDetails$.subscribe((data) => {
      if (data) {
        this.user = data;

        // Init form
        this.createForm();
      }
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get f() {
    return this.editUserForm.controls;
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      firstName: [{ value: this.user.firstName, disabled: false }],
      lastName: [{ value: this.user.lastName, disabled: false }],
      middleName: [{ value: this.user.middleName, disabled: false }],
      email: [{ value: this.user.email, disabled: false }],
      role: [{ value: this.user.role, disabled: false }],
      id: [{ value: this.user.id, disabled: false }],
    });
  }

  /**
   * Dispatch User create request
   */
  update(userDetails: User) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new UserStoreActions.UserCrudActions.UpdateRequest(userDetails)
    );
  }

  /**
   * Dispatch User create failed
   */
  updateFailed(): void { }

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
        this.navigateToDetails();
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

  getTitle(id) {
    return id.toString().padStart(3, '0');
  }

  private navigateToList() {
    this.router.navigate(['app/user/list']);
  }

  private navigateToDetails() {
    this.router.navigate(['../../details', this.userId], { relativeTo: this.route });
  }
}
