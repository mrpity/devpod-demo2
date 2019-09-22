import { Component, forwardRef, Input, Output, OnInit, OnChanges, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, FormBuilder, FormArray, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ENTER } from '@angular/cdk/keycodes';

export interface Chip {
  id: any;
  text?: string;
}

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipsAutocompleteNewComponent),
  multi: true
};

@Component({
  selector: 'app-chips-autocomplete-single',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})
export class ChipsAutocompleteNewComponent implements ControlValueAccessor, OnInit, OnChanges {
  sourceFiltered: any;
  autocompleteCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER];

  constructor() { }

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('chipInput', { static: false }) chipInput: MatInput;

  @Input() source: Chip[] = [];
  @Input() _innerValue: Chip;
  @Input() data: Chip;
  @Input() qa_id: string;
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() addOnBlur = false;

  onChange: any = () => { };

  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(v: Chip | null): void {
    this._innerValue = (!v || v.id) ? v : this.data;
    this.onChange(!this._innerValue ? this._innerValue : this._innerValue.id);
  }

  ngOnInit() {
    this._setSourceFiltered();
  }

  ngOnChanges(changes) {
    if (changes.source) {
      this._setSourceFiltered();
    }
  }

  private _setSourceFiltered() {
    this.sourceFiltered = this.autocompleteCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Chip[] {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value;
    }
    filterValue = filterValue.toLowerCase();

    return this.source.filter(chip => chip && chip.text.toLowerCase().indexOf(filterValue) === 0);
  }

  addChip($event: any): void {
    this.chipInput['nativeElement'].blur();
    const val = $event.option ? $event.option.value : { id: $event.value };
    this.writeValue(val);
  }

  removeChip(): void {
    this.writeValue(null);
    this.autocompleteCtrl.setValue('');
    setTimeout(() => { this.chipInput['nativeElement'].blur(); }, 0);
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.text : value;
  }

}
