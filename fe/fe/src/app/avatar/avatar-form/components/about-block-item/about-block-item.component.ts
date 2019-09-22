import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAboutItemModalComponent } from '../add-about-item-modal/add-about-item-modal.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

interface AboutBlock {
  heading: string;
  description: string;
}

@Component({
  selector: 'app-about-block-item',
  templateUrl: './about-block-item.component.html',
  styleUrls: ['./about-block-item.component.scss']
})
export class AboutBlockItemComponent implements OnInit {
  dialogRef: MatDialogRef<AddAboutItemModalComponent, string>;
  @Input() qa_id: string;
  @Input() data: AboutBlock;
  @Output() edit = new EventEmitter<string>();

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
  onRemove(): void {
    this.data.description = '';
    this.edit.emit('');
  }
}
