import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationPopupComponent} from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('validation.image.extension' );
_('validation.image.fileSize' );
_('validation.image.minDimensions' );
_('validation.image.maxDimensions' );

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {
  el: any;
  base64data: any;
  size: string;
  width: number;
  height: number;
  validationError = '';
  dialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @Output('dropped') dropped: EventEmitter<object> = new EventEmitter();
  @Input ('fileBase64') fileBase64: string;
  @Input ('name') name: string;

  ngOnInit() {
    if (this.fileBase64) {
      this.getFileMetadata(this.fileBase64);
      this.base64data = 'data:image/jpeg;base64, '  + this.fileBase64;
    }
    this.el.addEventListener('drop', (e) => {
      this.uploadFile(e.dataTransfer.files[0]);
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }
      return false;
    });

    this.el.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    });
  }
  validateSizeAndExtension(file) {
    if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name)) {
      this.validationError = 'extension';
      return true;
    } else if (file.size > 4096000) {
      this.validationError = 'fileSize';
      return true;
    }
    return false;
  }
  validateDimensions(height, width) {
      if (height < 180 || width < 180) {
        this.validationError = 'minDimensions';
        return true;
      } else if (height > 4096 || width > 4096) {
        this.validationError = 'maxDimensions';
        return true;
      }
      return false;
  }

  uploadFile(file) {
    this.validationError = '';
    if (this.validateSizeAndExtension(file)) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.name = file.name;
    this.size = file.size;

    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        console.log(this);
        if (!this.validateDimensions(this.height, this.width)) {
          this.base64data = reader.result;
        }
      };

      img.src = reader.result as string;
      this.dropped.emit({
        pic: (reader.result as string).split(',')[1],
        name: this.name
      });
    };
  }
  getFileMetadata(base64String) {
    const img = new Image();
    img.onload = () => {
      this.width = img.width;
      this.height = img.height;
    };

    img.src = 'data:image/jpeg;base64, ' + base64String;
  }
  delete() {
      this.dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: 'mat-custom-dialog',
      id: 'm_removePic',
      data: {
        title: _('avatar.profilePicRemoveModal.title'),
        message: _('avatar.profilePicRemoveModal.message'),
        confirmBtn: _('general.removeBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.base64data = '';
        this.dropped.emit({
          pic: '',
          name: ''
        });
      }
    });



  }
}
