import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { AvatarStoreState, AvatarStoreActions, AvatarStoreSelectors } from '../store';
import { AvatarDetails } from '../models/avatar.model';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { map, takeUntil } from 'rxjs/operators';
import { ComponentCanDeactivate } from '@app/core/guards/away.guard';
import { RootStoreSelectors } from '@app/store';

_('avatar.validation.update.success');

@Component({
  selector: 'app-avatar-edit',
  templateUrl: './avatar-edit.component.html',
  styleUrls: ['./avatar-edit.component.scss']
})

export class AvatarEditComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();
  id: number;
  isCreateDisabled$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  avatarDetails: AvatarDetails;
  cancelDialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;
  currentRoute: any;
  isDirty = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<AvatarStoreState.State>
  ) {}

  ngOnInit() {
    /**
     * Get Id from url params
     */
    this.id = +this.route.snapshot.paramMap.get('id');

    this.isLoading$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getIsLoading
      )
    );

    /**
     * Get avatar details data
     */
    this.store$.pipe(
      select(
        AvatarStoreSelectors.getSelectedDetails
      )
    ).subscribe(data => {
      this.avatarDetails = data;
      if (!data) {
        /**
         * Load data from server by dispatching an action
         * if no data already loaded
         */
        this.store$.dispatch(
          new AvatarStoreActions.AvatarCrudActions.LoadDetailsRequest({ id: this.id })
        );
      }
    });

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(RootStoreSelectors.getRouterState)
    ).subscribe(data => {
      this.currentRoute = data;
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();

    /**
     * Clear avatar data: connection, rules, details
     */
    this.store$.dispatch(
      new AvatarStoreActions.AvatarAdditionalActions.ClearAvatarData()
    );
  }

  /**
   * Dispatch avatar update
   */
  update(data) {
    this.setIsDirty(false);
    this.store$.dispatch(
      new AvatarStoreActions.AvatarCrudActions.UpdateRequest({
        id: this.id,
        avatarDetails: data
      })
    );
  }

  updateFailed(data) {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarCrudActions.FormInvalid(data)
    );
  }

  /**
   * Cancel avatar editing
   */
  initCancelDialog() {
    this.cancelDialogRef = this.dialog.open(ConfirmationPopupComponent, {
      id: 'm_cancelAvatarCreate',
      panelClass: 'mat-custom-dialog',
      data: {
        title: _('avatar.cancelEditModal.title'),
        message: _('avatar.cancelEditModal.msg'),
        confirmBtn: _('general.confirmBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });
  }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  /**
   * Cancel avatar creating
   */
  cancelAvatarEdit(): void {
    this.router.navigate(['../../details', this.id, 'general'], {relativeTo: this.route});
  }

  /**
   * Confirm cancel on change location or press BACK button
   * NOT WORKING WITH LAZY LOADING!
   */
  // @HostListener('window:beforeunload')
  // canDeactivate() {
  //   if (!this.isDirty || this.currentRoute.state.url === '/login') { return true; } // do nothing
  //   this.initCancelDialog();
  //   return this.cancelDialogRef.afterClosed().pipe(
  //     map(result => !!result)
  //   );
  // }

}
