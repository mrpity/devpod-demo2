import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMaritalStatusModalComponent } from '../add-marital-status-modal/add-marital-status-modal.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { MaritalStatus } from '../../../avatar.enums';

_('avatar.labels.maritalStatuses.IN_RELATIONSHIP');
_('avatar.labels.maritalStatuses.MARRIED');
_('avatar.labels.maritalStatuses.SINGLE');

@Component({
  selector: 'app-marital-status',
  templateUrl: './marital-status.component.html',
  styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent implements OnInit {
  dialogRef: MatDialogRef<AddMaritalStatusModalComponent, any>;
  @Output() edit = new EventEmitter<MaritalStatus>();
  @Output() remove = new EventEmitter<boolean>();
  @Input() qa_id: string;
  @Input() data: MaritalStatus;
  @Input() heading: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  onEdit(): void {
    this.dialogRef = this.dialog.open(AddMaritalStatusModalComponent, {
      width: '500px',
      id: 'm_addMaritalStatus',
      data: {
        confirmBtn: _('general.saveBtn'),
        cancelBtn: _('general.cancelBtn'),
        heading: this.heading,
        maritalStatus: this.data
      }
    });
    this.dialogRef.afterClosed().subscribe((result: MaritalStatus) => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

  onRemove() {
    this.remove.emit(true);
  }
}
