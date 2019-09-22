import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Output() toggleNotifications = new EventEmitter();

  dialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;
  constructor (
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  logout(): void {
    this.dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: 'mat-custom-dialog',
      id: 'm_logoutModal',
      data: {
        title: _('logout.title'),
        message: _('logout.message'),
        confirmBtn: _('logout.logoutBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
      }
    });
  }

  openNotifications() {
    this.toggleNotifications.emit();
  }
}
