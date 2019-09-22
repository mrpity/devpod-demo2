import { Component, Input } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('avatar.importExportLog.messages.IMPORT_FAILED_FACEBOOK');
_('avatar.importExportLog.messages.IMPORT_FAILED_ODNOKLASSNIKI');
_('avatar.importExportLog.messages.IMPORT_SUCCEEDED_FACEBOOK');
_('avatar.importExportLog.messages.IMPORT_SUCCEEDED_ODNOKLASSNIKI');
_('avatar.importExportLog.messages.EXPORT_FAILED_FACEBOOK');
_('avatar.importExportLog.messages.EXPORT_FAILED_ODNOKLASSNIKI');
_('avatar.importExportLog.messages.EXPORT_SUCCEEDED_FACEBOOK');
_('avatar.importExportLog.messages.EXPORT_SUCCEEDED_ODNOKLASSNIKI');
_('avatar.importExportLog.hint.open');
_('avatar.importExportLog.hint.close');

@Component({
  selector: 'app-import-export-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent {
  @Input() avatarLog: any[] = [];

  isTooltipVisible = false;
}
