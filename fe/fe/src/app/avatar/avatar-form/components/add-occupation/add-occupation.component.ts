import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddAboutItemModalComponent } from '../add-about-item-modal/add-about-item-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

interface AboutBlock {
  heading: string;
  description: string;
}

@Component({
  selector: 'app-add-occupation',
  templateUrl: './add-occupation.component.html',
  styleUrls: ['./add-occupation.component.scss']
})
export class AddOccupationComponent implements OnInit {
  dialogRef: MatDialogRef<AddAboutItemModalComponent, string>;
  @Input() qa_id: string;
  @Input() data: AboutBlock;
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  onEdit(): void {
    this.dialogRef = this.dialog.open(AddAboutItemModalComponent, {
      id: 'm_addAbout',
      width: '500px',
      data: {
        confirmBtn: _('general.saveBtn'),
        cancelBtn: _('general.cancelBtn'),
        block: this.data
      }
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }
  onRemove() {
    this.data.description = '';
    this.remove.emit(true);
  }

}
