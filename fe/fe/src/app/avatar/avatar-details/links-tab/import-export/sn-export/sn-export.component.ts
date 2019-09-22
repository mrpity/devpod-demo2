import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AvatarStoreActions, AvatarStoreState, AvatarStoreSelectors } from '@app/avatar/store';
import { AvatarDetails,  } from '@app/avatar/models/avatar.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AvatarExportSummary } from '@app/avatar/models/avatar-override-diff.model';
import { AvatarStatus } from '@app/avatar/avatar.enums';

_('avatar.confirmExport.title');
_('avatar.confirmExport.message');

@Component({
  selector: 'app-sn-export',
  templateUrl: './sn-export.component.html',
  styleUrls: ['./sn-export.component.scss']
})
export class SnExportComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();

  selectedSN: string[] = [];
  isExportPreview = false;
  isExportSummary = false;
  exportDisabled = false;
  exportSummaryData: AvatarExportSummary;

  @Input() avatarId: number;
  @Input() avatarData: Partial<AvatarDetails> = {};

  /**
   * Getter/setter for Social Networks
   */
  private _socialNetworks: string[];
  @Input() set socialNetworks(values: string[]) {
    this._socialNetworks = values;
    this.selectedSN = [];
  }
  get socialNetworks(): string[] {
    return this._socialNetworks;
  }

  /**
   * Getter/setter for Awaiting Confirmation
   */
  private _isAwaitingConfirmation: boolean;
  @Input() set isAwaitingConfirmation(value: boolean) {
    this._isAwaitingConfirmation = value;
  }
  get isAwaitingConfirmation(): boolean {
    return this._isAwaitingConfirmation;
  }

  /**
   * Getter/setter for Avatar Status
   */
  private _avatarStatus: AvatarStatus;
  @Input() set avatarStatus(value: AvatarStatus) {
    this._avatarStatus = value;
    if (value === AvatarStatus.EXPORT || value === AvatarStatus.EXPORT_REVIEW) {
      this.store$.dispatch(
        new AvatarStoreActions.AvatarExportActions.LoadExportSummaryRequest({ id: this.avatarId })
      );
      this.isExportPreview = false;
      this.isExportSummary = true;
    } else if (value === AvatarStatus.EXPORT_PREVIEW) {
      this.isExportPreview = true;
    } else {
      this.isExportSummary = false;
      this.isExportPreview = false;
    }
  }
  get avatarStatus(): AvatarStatus {
    return this._avatarStatus;
  }

  constructor(
    private store$: Store<AvatarStoreState.State>,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    /**
     * Get current avatar Export Summary Data from store (by avatarId)
     */
    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.getExportSummaries)
    ).subscribe((data) => {
      this.exportSummaryData = data[this.avatarId];
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  exportStart(fields) {
    this.helpers.openConfirmDialog({
      title: 'avatar.confirmExport.title',
      message: 'avatar.confirmExport.message',
      cancelBtn: 'general.cancelBtn',
      confirmBtn: 'general.confirmBtn'
    }).afterClosed().pipe(
      filter(Boolean, takeUntil(this._unsubscribe$))
    ).subscribe(() => {
      this.exportDisabled = true;
      this.store$.dispatch(
        new AvatarStoreActions.AvatarExportActions.ExportStartRequest({
          id: this.avatarId,
          targets: this.selectedSN,
          fields: fields
        })
      );
    });
  }

  exportReview() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarExportActions.ReviewExportSummaryRequest({
        id: this.avatarId
      })
    );
  }

  exportCancel() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarExportActions.ExportPreviewDiscard({
        id: this.avatarId
      })
    );
  }

  next() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarExportActions.ExportPreview({
        id: this.avatarId
      })
    );
  }

  isActionDisabled() {
    return !this.selectedSN.length;
  }
}
