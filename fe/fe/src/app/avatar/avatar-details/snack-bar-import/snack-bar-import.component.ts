import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('avatar.validation.links.successfulImport');
_('avatar.validation.links.failedImport');
_('avatar.validation.links.successfulExport');
_('avatar.validation.links.failedExport');
_('avatar.importCrawlingErrors.PROXY');
_('avatar.importCrawlingErrors.NO_PROXY');
_('avatar.importCrawlingErrors.UNSPECIFIED');
_('avatar.importCrawlingErrors.UNKNOWN');
_('avatar.importCrawlingErrors.TIMEOUT');
_('avatar.importCrawlingErrors.BAD_PROXY');
_('avatar.importCrawlingErrors.INVALID_CREDENTIALS');
_('avatar.importCrawlingErrors.CREDENTIALS');
_('avatar.importCrawlingErrors.ACCOUNT_BLOCKED');
_('avatar.importCrawlingErrors.AUTH');
_('avatar.importCrawlingErrors.IO');
_('avatar.validation.links.successfulUpdateConnection');
_('avatar.validation.links.failedUpdateConnection');

@Component({
  selector: 'app-snack-bar-import',
  templateUrl: './snack-bar-import.component.html',
  styleUrls: ['./snack-bar-import.component.scss']
})
export class SnackBarImportComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private router: Router,
    private snackBarRef: MatSnackBarRef<SnackBarImportComponent>,
    public translate: TranslateService,
  ) {}

  goto() {
    this.router.navigate([`app/avatar/details/${this.data.avatar.avatarId}/links`])
      .then(() => {
        setTimeout(() => this.closeMe(), 500);
      });
  }

  closeMe() {
    this.snackBarRef.dismiss();
  }
}
