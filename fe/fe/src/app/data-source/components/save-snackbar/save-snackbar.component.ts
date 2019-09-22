import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ConfirmationPopupComponent} from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import {filter, map} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-save-snackbar',
  templateUrl: './save-snackbar.component.html',
  styleUrls: ['./save-snackbar.component.scss']
})
export class SaveSnackbarComponent implements OnInit {

  @Output() dismissWithAction = new EventEmitter<boolean>();

  private dialogRef: MatDialogRef<ConfirmationPopupComponent, string>;
  deleteMultipleDialogStream = new Subject();

  constructor(private dialog: MatDialog) { }

  openDeleteMultipleDialog() {
    return this.dialogRef;
  }

  private deleteMultiple() {
    this.openDeleteMultipleDialog()
      .afterClosed().pipe(
      map((result) => {
        this.dialogRef = null;
        return result;
      }),
      filter((result) => !!result)
    )
      .subscribe(() => {
        this.dismissWithAction.emit();
      });
  }


  ngOnInit() {
    this.deleteMultipleDialogStream
      .pipe(
        filter((): any => {
          return !this.dialogRef;
        })
      )
      .subscribe( () => {
        this.deleteMultiple();
      });
  }

}
