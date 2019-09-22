import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { filter } from 'rxjs/operators';
import { RuleDialogComponent } from './components/rule-dialog/rule-dialog.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-automation-rule-create',
  templateUrl: './automation-rule-create.component.html',
  styleUrls: ['./automation-rule-create.component.scss']
})
export class AutomationRuleCreateComponent implements OnDestroy {
  private _addRuleDialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  private _ruleDialogConfig = {
    width: '780px',
    minWidth: '720px',
    height: '550px',
    autoFocus: false,
    disableClose: true,
    position: {
      top: '100px'
    },
    data: {
      title: _('dataSource.addDataSource.createAutomationRule.title'),
      confirmBtn: _('dataSource.addDataSource.createBtn'),
      cancelBtn: _('dataSource.addDataSource.cancelBtn'),
    }
  };
  private _ruleDialogRef: MatDialogRef<RuleDialogComponent, string>;

  @Output() addRule = new EventEmitter();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnDestroy() {
    if (this._ruleDialogRef) {
      this._ruleDialogRef.close();
    }
  }

  openAddRuleDialog() {
    this._ruleDialogRef = this.dialog.open(RuleDialogComponent, this._ruleDialogConfig);
    this._ruleDialogRef.afterClosed()
      .pipe(
        filter(Boolean
        )).subscribe((rule: any) => {
          this.addRule.emit(rule);
        });
    return this._addRuleDialogRef;
  }
}
