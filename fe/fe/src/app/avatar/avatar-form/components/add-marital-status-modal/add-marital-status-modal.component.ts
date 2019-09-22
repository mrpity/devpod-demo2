import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MaritalStatus } from '../../../avatar.enums';

@Component({
  selector: 'app-add-marital-status-modal',
  templateUrl: './add-marital-status-modal.component.html',
  styleUrls: ['./add-marital-status-modal.component.scss']
})
export class AddMaritalStatusModalComponent implements OnInit {
  heading: string;
  maritalStatus: MaritalStatus;
  maritalStatusCtrl: FormControl = new FormControl();
  statuses = MaritalStatus;
  maritalStatusKeys: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMaritalStatusModalComponent>,
  ) {}

  ngOnInit() {
    this.heading = this.data.heading;
    if (this.data.maritalStatus) {
      this.maritalStatusCtrl.setValue(this.data.maritalStatus);
    }
    this.maritalStatusKeys = Object.keys(this.statuses);
  }

  closeDialog() {
    this.dialogRef.close(this.maritalStatusCtrl.value);
  }
}
