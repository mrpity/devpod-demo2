import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AvatarStatus } from '../../../avatar.enums';
import { AvatarDiff } from '../../../models/avatar-override-diff.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-override-diff-table',
  templateUrl: './override-diff-table.component.html',
  styleUrls: ['./override-diff-table.component.scss']
})
export class OverrideDiffTableComponent implements OnInit {
  snName: string;
  checkedFields = [];
  cancelDialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;

  @Input() diffData: AvatarDiff;
  @Input() avatarStatus: AvatarStatus;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor(
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkedFields = Object.keys(this.diffData).filter(
      item => this.diffData[item] && !this.diffData[item].erroneous && this.diffData[item].imported
    );
    this.getDiffSocialNetworkName();
  }

  isChecked(name) {
    return this.checkedFields.indexOf(name) !== -1;
  }

  getDiffSocialNetworkName() {
    switch (this.avatarStatus) {
      case AvatarStatus.FB_IMPORT_CONFIRMATION:
        this.snName = 'FACEBOOK';
        break;
      case AvatarStatus.OK_IMPORT_CONFIRMATION:
        this.snName = 'ODNOKLASSNIKI';
        break;
      default:
        this.snName = null;
    }
  }

  toggleField(name) {
    const index = this.checkedFields.indexOf(name);
    if (index === -1) {
      this.checkedFields.push(name);
    } else {
      this.checkedFields.splice(index, 1);
    }
  }

  confirmDiff() {
    this.confirm.emit({ fields: this.checkedFields });
  }

  cancelDiff() {
    this.cancelDialogRef = this.dialog.open(ConfirmationPopupComponent, {
      id: 'm_cancelAvatarDiff',
      panelClass: 'mat-custom-dialog',
      data: {
        title: _('avatar.cancelAvatarDiffModal.title'),
        message: _('avatar.cancelAvatarDiffModal.msg'),
        confirmBtn: _('general.confirmBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });
    this.cancelDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancel.emit();
      }
    });
  }
}
