import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { AvatarStoreState, AvatarStoreActions, AvatarStoreSelectors } from '../store';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ComponentCanDeactivate } from '@app/core/guards/away.guard';
import { map, takeUntil } from 'rxjs/operators';
import { RootStoreSelectors } from '@app/store';

_('avatar.validation.create.success');

@Component({
  selector: 'app-avatar-create',
  templateUrl: './avatar-create.component.html',
  styleUrls: ['./avatar-create.component.scss']
})
export class AvatarCreateComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();
  isCreateDisabled$: Observable<boolean>;
  currentRoute: any;
  cancelDialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;
  isDirty = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store$: Store<AvatarStoreState.State>
  ) {}

  ngOnInit() {
    this.isCreateDisabled$ = this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.getIsCreateBtnDisabled)
    );

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
   * Dispatch avatar create
   */
  create(data): void {
    this.setIsDirty(false);
    this.store$.dispatch(
      new AvatarStoreActions.AvatarCrudActions.CreateRequest(data)
    );
  }

  /**
   * Dispatch avatar create failed
   */
  createFailed(data): void {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarCrudActions.FormInvalid(data)
    );
  }

  setIsDirty(value): void {
    this.isDirty = value;
  }

  /**
   * Show cancel confirmation dialog
   */
  initCancelDialog() {
    this.cancelDialogRef = this.dialog.open(ConfirmationPopupComponent, {
      id: 'm_cancelAvatarCreate',
      panelClass: 'mat-custom-dialog',
      data: {
        title: _('avatar.cancelCreateModal.title'),
        message: _('avatar.cancelCreateModal.msg'),
        confirmBtn: _('general.confirmBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });
  }

  /**
   * Cancel avatar creating
   */
  cancelAvatarCreate(): void {
    this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
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
