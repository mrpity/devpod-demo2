import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-about-item-modal',
  templateUrl: './add-about-item-modal.component.html',
  styleUrls: ['./add-about-item-modal.component.scss']
})
export class AddAboutItemModalComponent implements OnInit {
  heading: string;
  description: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddAboutItemModalComponent>) {}

  ngOnInit() {
    if (this.data.block) {
      this.heading = this.data.block.heading ;
      this.description = this.data.block.description;
    }
  }
  closeDialog() {
    this.dialogRef.close(this.description);
  }
}
