import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('search.sseRequestCompleted.CANCELLED');
_('search.sseRequestCompleted.FAILED');
_('search.sseCsseRequestCompletedompleted.NEW');
_('search.sseRequestCompleted.SEARCHING');
_('search.sseRequestCompleted.SUCCEEDED');

@Component({
  selector: 'app-snack-bar-search-request',
  templateUrl: './snack-bar-search-request.component.html',
  styleUrls: ['./snack-bar-search-request.component.scss']
})
export class SnackBarSearchRequestComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private router: Router,
    private snackBarRef: MatSnackBarRef<SnackBarSearchRequestComponent>,
    public translate: TranslateService,
  ) {}

  goto() {
    this.router.navigate([`app/search/${this.data.requestId}/results`])
      .then(() => {
        setTimeout(() => this.closeMe(), 500);
      });
  }

  closeMe() {
    this.snackBarRef.dismiss();
  }
}
