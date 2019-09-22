import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { fromEvent, merge, noop } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { CrawlingTypesService } from '@app/data-source/services/crawling-types.service';
import { DataSourceType } from '@app/data-source/data-source.enums';


_('dataSource.importDataSource.import.validation.extension');
_('dataSource.importDataSource.import.validation.fileSize');
_('dataSource.importDataSource.import.validation.empty');
_('dataSource.importDataSource.import.validation.lineCount');
_('dataSource.importDataSource.import.validation.unsupportedLines');
_('dataSource.importDataSource.import.validation.emptyFile');
_('dataSource.importDataSource.import.validation.allLinesIncorrect');

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss']
})

export class FileImportComponent implements OnInit, AfterViewInit, OnChanges {
  el: any;
  base64data: string[];
  base64dataClear = [];
  lineCount: number;
  fileIsTotallyCorrect: boolean;
  fileImportDirty: boolean;
  size: string;
  name: string;
  width: number;
  height: number;
  validationError = '';
  dialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;
  urlPattern = new RegExp(/^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\..{2,20}(:[0-9]{1,5})?(\/.*)?$/);
  urlPatternAlias = new RegExp(/^(http:\/\/|https:\/\/|ftp:\/\/)/);
  profileIdPattern = new RegExp(/([0-9a-zA-Z\.])/);

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    public helpers: HelpersService,
    public crawling: CrawlingTypesService
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @Output() dropped: EventEmitter<object> = new EventEmitter();
  @Input() currentType: DataSourceType;
  @Input() submitted: DataSourceType;

  ngOnInit() {
  }

  ngOnChanges(change) {
    if (change.submitted) {
      if (change.submitted.currentValue
        && !this.validationError
        && !this.base64dataClear.length) {
        this.validationError = 'empty';
      }
    } if (change.currentType && this.base64data) {
      this.validationError = '';
      this.emitResult();
    }
  }

  ngAfterViewInit() {
    const dragOverStream$ = fromEvent(this.el, 'dragover').pipe(
      tap((event: any) => {
        event.dataTransfer.dropEffect = 'move';
      })
    );
    const dropStream$ = fromEvent(this.el, 'drop').pipe(
      tap((event: any) => {
        this.uploadFile(event.dataTransfer.files[0]);
      })
    );
    merge(dragOverStream$, dropStream$).pipe(
      tap((event: any) => event.preventDefault())
    ).subscribe(noop);
  }

  uploadFile(file) {
    this.validationError = '';
    if (!file) {
      return;
    } else if (this.validateSizeAndExtension(file)) {
      return;
    }
    this.fileImportDirty = true;
    const reader = new FileReader();

    const fileReader$ = fromEvent(reader, 'load').pipe(
      map((event: any): string[] => event.target.result.replace(/\r/g, '').split(/\n/)),
      filter(result => {
        if (result.length > 100) {
          this.validationError = 'lineCount';
          return false;
        }
        return true;
      }),
    );

    fileReader$.subscribe((result: string[]) => {
      this.base64data = result;
      this.emitResult();
    });

    const fileReaderError$ = fromEvent(reader, 'error');

    fileReaderError$.subscribe((event: any) => console.log(`File can't be read, error code ${event.target.error.code}`));
    reader.readAsText(file);
    this.size = file.size;
    this.name = file.name;
  }

  emitResult() {
    if (this.validateFileData(this.base64data)) {
      return this.dropped.emit(null);
    }
    this.dropped.emit(this.base64dataClear);
  }

  validateSizeAndExtension(file) {
    if (!(/\.csv$/i).test(file.name)) {
      this.validationError = 'extension';
      return true;
    } else if (file.size > 1024000) {
      this.validationError = 'fileSize';
      return true;
    } else if (file.size < 1) {
      this.validationError = 'emptyFile';
      return true;
    }
    return false;
  }

  validateFileData(file) {
    this.base64dataClear = file.filter(line => this.isValid(line));
    if (this.base64dataClear.length === 0) {
      this.validationError = 'allLinesIncorrect';
      return true;
    } else if (file.length !== this.base64dataClear.length) {
      this.validationError = 'unsupportedLines';
    } else if (file.length === this.base64dataClear.length) {
      this.fileIsTotallyCorrect = true;
    }
    return false;
  }

  isValid(line) {
    if (this.crawling.byProfile(this.currentType)) {
      return (this.profileIdPattern.test(line) && !this.urlPatternAlias.test(line));
    } else if (this.crawling.byUrl(this.currentType)) {
      return this.urlPattern.test(line);
    }
  }

  delete() {
    this.dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: 'mat-custom-dialog',
      id: 'm_removePic',
      data: {
        title: _('dataSource.importDataSource.import.fileRemoveModal.title'),
        message: _('dataSource.importDataSource.import.fileRemoveModal.message'),
        confirmBtn: _('general.removeBtn'),
        cancelBtn: _('general.cancelBtn'),
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.submitted) {
          this.validationError = 'empty';
        } else {
          this.validationError = '';
          this.fileImportDirty = false;
        }
        this.base64data = null;
        this.base64dataClear = [];
        this.dropped.emit(this.base64data);
      }
    });
  }
}
