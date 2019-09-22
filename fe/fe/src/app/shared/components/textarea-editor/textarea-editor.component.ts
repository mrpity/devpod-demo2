import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-textarea-editor',
  templateUrl: './textarea-editor.component.html',
  styleUrls: ['./textarea-editor.component.scss']
})
export class TextareaEditorComponent implements OnInit {

  isEditMode = false;
  dataCtrl: FormControl = new FormControl();

  private _onDestroy = new Subject<void>();

  @Input ('data') data: string[];
  @Output ('change') change = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.data) {
      this.dataCtrl.setValue(this.data.join('\n'));
    }

    this.dataCtrl.valueChanges
      .pipe(
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        this.updateData();
      });
  }

  updateData() {
    const finalData = this.dataCtrl.value.split('\n');
    this.change.emit(finalData);
  }

  toggleMode() {
    this.isEditMode = !this.isEditMode;
    this.updateData();
  }
}
