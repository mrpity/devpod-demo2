import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarStoreSelectors, AvatarStoreActions, AvatarStoreState } from '@app/avatar/store';
import { AvatarDetails,  } from '@app/avatar/models/avatar.model';
import { AvatarDiff } from '@app/avatar/models/avatar-override-diff.model';

@Component({
  selector: 'app-sn-import',
  templateUrl: './sn-import.component.html',
  styleUrls: ['./sn-import.component.scss']
})
export class SnImportComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject();

  selectedSN = '';
  diffData: AvatarDiff;

  @Input() avatarId: number;
  @Input() avatarData: Partial<AvatarDetails> = {};
  @Input() avatarStatus: string;

  /**
   * Getter/setter for Social Networks
   */
  private _socialNetworks: string[];
  @Input() set socialNetworks(values: string[]) {
    if (!values.length || (this.selectedSN && values.indexOf(this.selectedSN) === -1)) {
      this.selectedSN = '';
    }
    this._socialNetworks = values;
  }
  get socialNetworks(): string[] {
    return this._socialNetworks;
  }

  /**
   * Getter/setter for Awaiting Confirmation
   */
  private _isAwaitingConfirmation: boolean;
  @Input() set isAwaitingConfirmation(value: boolean) {
    if (value && !this.diffData) {
      this.store$.dispatch(
        new AvatarStoreActions.AvatarImportActions.LoadImportDiffRequest({ id: this.avatarId })
      );
    }
    this._isAwaitingConfirmation = value;
  }
  get isAwaitingConfirmation(): boolean {
    return this._isAwaitingConfirmation;
  }

  constructor(
    private store$: Store<AvatarStoreState.State>
  ) { }

  ngOnInit() {
    /**
     * Get current avatar diff from store (by avatarId)
     */
    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.getImportDiffs)
    ).subscribe((data) => {
      this.diffData = data[this.avatarId];
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  importStart() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarImportActions.ImportStartRequest({
        id: this.avatarId,
        sn: this.selectedSN
      })
    );
  }

  importConfirm(data) {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarImportActions.ConfirmImportDiffRequest({
        id: this.avatarId,
        fields: data.fields
      })
    );
  }

  importCancel() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarImportActions.CancelImportDiffRequest({
        id: this.avatarId
      })
    );
  }

  isActionDisabled() {
    return !this.selectedSN;
  }
}
