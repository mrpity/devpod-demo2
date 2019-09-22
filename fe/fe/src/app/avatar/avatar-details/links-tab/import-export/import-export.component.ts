import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AvatarStoreSelectors, AvatarStoreActions, AvatarStoreState } from '@app/avatar/store';
import { AvatarStatus } from '@app/avatar/avatar.enums';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarService } from '@app/avatar/services/avatar.service';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();

  @Input() avatarId: number;
  @Input() socialNetworks: string[];

  avatarStatus = AvatarStatus.AVAILABLE;
  snActionType = 'import';
  isProcessing = false;
  isAwaitingConfirmation = false;

  /**
   * Get avatar import/export log
   */
  avatarLog$ = this.store$.pipe(
    select(AvatarStoreSelectors.getAvatarLog)
  );

  /**
   * Get current avatar from store
   */
  avatarData$ = this.store$.pipe(
    select(AvatarStoreSelectors.getSelectedDetails)
  );

  constructor(
    private store$: Store<AvatarStoreState.State>,
    private avatarService: AvatarService
  ) { }

  ngOnInit() {
    this.getLogActivity();

    /**
     * Get current avatar state (status)
     */
    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.getAwaitImportConfirmation)
    ).subscribe((data) => {
      if (data.indexOf(this.avatarId) !== -1) {
        this.store$.dispatch(
          new AvatarStoreActions.AvatarAdditionalActions.GetCurrentStateRequest({ id: this.avatarId })
        );
        this.getLogActivity();
      }
    });

    /**
     * Get current avatar status and update flags
     */
    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.getStatus)
    ).subscribe((status) => {
      this.avatarStatus = status;
      this.snActionType = this.avatarService.setImportExportType(status, this.snActionType);
      this.isProcessing = this.avatarService.setImportExportProcessing(status);
      this.isAwaitingConfirmation = this.avatarService.setImportExportAwaitingConfirmation(status);
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getLogActivity() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarImportActions.LoadImportActivityLogRequest({ id: this.avatarId })
    );
  }
}
