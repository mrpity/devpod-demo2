import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface ConfirmationPopupData {
  title: string;
  message: string;
  cancelBtn: string;
  confirmBtn: string;
}
@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationPopupData,
    public dialModalRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
    this.updatePosition();
  }

  updatePosition() {
    // delete this after move all open dialogs to service
    this.dialModalRef.updatePosition({ top: '100px' });
  }
}
