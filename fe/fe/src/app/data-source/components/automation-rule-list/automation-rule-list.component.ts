import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-automation-rule-list',
  templateUrl: './automation-rule-list.component.html',
  styleUrls: ['./automation-rule-list.component.scss']
})
export class AutomationRuleListComponent implements OnDestroy {
  @Input() automationRulesStream: BehaviorSubject<any>;
  @Input() isViewMode: boolean;
  @Output() removeRule: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [
    'frequency',
    'activeTimePeriod',
    'zoneOffset',
    'when',
    'endingDate',
    'maxConnections',
    'actions'
  ];
  confirmDialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  deleteRuleDialogConfig = {
    panelClass: 'mat-custom-dialog',
    id: 'd_deleteAutomationRule',
    data: {
      title: _('dataSource.editDataSource.dialog.deleteAutomationRule.title'),
      message: _('dataSource.editDataSource.dialog.deleteAutomationRule.message'),
      confirmBtn: _('buttons.delete'),
      cancelBtn: _('buttons.cancel'),
    }
  };

  private _unsubscribe$ = new Subject();

  constructor(
    public helpers: HelpersService,
    private dialog: MatDialog
  ) { }

  openDeleteRuleConfirmDialog(rule) {
    this.confirmDialogRef = this.dialog.open(ConfirmationPopupComponent, this.deleteRuleDialogConfig);
    this.confirmDialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this._unsubscribe$)
      ).subscribe(() => {
        this.removeRule.emit(rule);
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
