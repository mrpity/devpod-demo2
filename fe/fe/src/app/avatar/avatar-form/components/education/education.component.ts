import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEducationModalComponent } from '../add-education-modal/add-education-modal.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

interface Education {
  city: string;
  description: string;
  name: string;
  studiedFrom: Date;
  studiedTo: Date;
  type: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  dialogRef: MatDialogRef<AddEducationModalComponent, any>;
  @Output() edit = new EventEmitter<Education>();
  @Output() remove = new EventEmitter<boolean>();
  @Input() qa_id: string;
  @Input() data: Education;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  onEdit(): void {
    this.dialogRef = this.dialog.open(AddEducationModalComponent, {
      width: '500px',
      id: 'm_addAEducation',
      data: {
        confirmBtn: _('general.saveBtn'),
        cancelBtn: _('general.cancelBtn'),
        education: this.data
      }
    });
    this.dialogRef.afterClosed().subscribe((result: Education) => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

  onRemove() {
    this.remove.emit(true);
  }
}
