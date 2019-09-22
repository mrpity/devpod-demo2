import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddGeolocationModalComponent } from '../add-geolocation-modal/add-geolocation-modal.component';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AvatarCity } from '@app/avatar/models/avatar.model';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  dialogRef: MatDialogRef<AddGeolocationModalComponent, any>;
  @Output() edit = new EventEmitter<AvatarCity>();
  @Output() remove = new EventEmitter<boolean>();
  @Input() qa_id: string;
  @Input() data: AvatarCity;
  @Input() heading: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  onEdit(): void {
    this.dialogRef = this.dialog.open(AddGeolocationModalComponent, {
      width: '500px',
      id: 'm_addGeolocation',
      data: {
        confirmBtn: _('general.saveBtn'),
        cancelBtn: _('general.cancelBtn'),
        heading: this.heading,
        geolocation: this.data
      }
    });
    this.dialogRef.afterClosed().subscribe((result: AvatarCity) => {
      if (result) {
        this.edit.emit(result);
      }
    });
  }

  onRemove() {
    this.remove.emit(true);
  }

  displayGeolocation() {
    if (this.data.city && this.data.country) {
      return `${this.data.city}, ${this.data.country}`;
    } else if (this.data.city && !this.data.country) {
      return this.data.city;
    } else if (!this.data.city && this.data.country) {
      return this.data.country;
    } else {
      return null;
    }
  }
}
