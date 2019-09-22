import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    private translate: TranslateService,
    private router: Router,
  ) { }

  goto() {
    this.router.navigate([`app/avatar/details/${this.data.item.id}/links`])
      .then(() => {
        setTimeout(() => this.closeMe(), 500);
      });
  }

  closeMe() {
    this.snackBarRef.dismiss();
  }

  get message() {
    const key = this.data.message || '';
    const optionsKey = this.data.messageOptions
      ? this.data.messageOptions.message : '';
    if (this.data.messageOptions && this.data.messageOptions.type) {
      return this.translate.instant(key, {
          value: this.translate.instant(optionsKey)
      });
    } else {
      return this.translate.instant(key);
    }
  }
}
