import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AvatarStatus } from '@app/avatar/avatar.enums';

_('avatar.exportSummary.columnTitle.statuses.FAILED');
_('avatar.exportSummary.columnTitle.statuses.DONE');
_('avatar.exportSummary.columnTitle.statuses.SKIPPED');
_('avatar.exportSummary.columnTitle.statuses.ABORTED');
_('avatar.exportSummary.columnTitle.statuses.IN_PROGRESS');
_('avatar.importExportFails.FACEBOOK');
_('avatar.importExportFails.ODNOKLASSNIKI');

@Component({
  selector: 'app-export-summary-table',
  templateUrl: './export-summary-table.component.html',
  styleUrls: ['./export-summary-table.component.scss'],
  providers: [DatePipe]
})
export class ExportSummaryTableComponent {

  displayedColumns = [
    'field'
  ];

  @Output() confirm = new EventEmitter();
  @Input() avatarStatus: AvatarStatus;

  private _summaryData: string[];
  @Input() set summaryData(value: any) {
    this._summaryData = value;
    if (value) {
      this.displayedColumns = [
        ...this.displayedColumns,
        ...value.ids
      ].filter((v, i, a) => a.indexOf(v) === i); // Return only unique data
    }
  }
  get summaryData(): any {
    return this._summaryData;
  }

  constructor() { }

  isErrorStatus(status) {
    return status === 'FAILED';
  }

  exportReview() {
    this.confirm.emit();
  }
}
