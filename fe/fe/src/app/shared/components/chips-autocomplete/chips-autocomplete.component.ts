import { Component, forwardRef, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormArray, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { map, startWith } from 'rxjs/operators';

export interface Chip {
  id: any;
  text: string;
}

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {
  sourceFiltered: any;
  autocompleteCtrl = new FormControl();

  constructor() { }

  @ViewChild('chipInput', { static: false }) chipInput: MatInput;
  @Input() source: Chip[] = [];
  @Input() data: Chip[];
  @Input() qa_id: string;
  @Input() placeholder: string;
  @Input() multiple = true;
  @Input() addOnBlur = true;
  @Output() add = new EventEmitter(); // Create item in this.data here
  @Output() update = new EventEmitter(); // Update item in this.data here
  @Output() remove = new EventEmitter(); // Delete item from this.data here

  ngOnInit() {
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

    return this.source.filter(tag => tag.text.toLowerCase().indexOf(filterValue) === 0);
  }

  addChip(event: MatAutocompleteSelectedEvent): void {
    const value: Chip = event.option.value;
    let isNewValue = true;
    if (this.multiple) {
      this.data.forEach((item) => {
        if (item.id === value.id) {
          isNewValue = false;
        }
      });
      if (isNewValue) {
        this.add.emit(value);
      }
    } else {
      this.add.emit(value);
    }
    this.chipInput['nativeElement'].blur();
    this.chipInput['nativeElement'].value = '';
  }

  removeChip(index): void {
    this.remove.emit(index);
    this.chipInput['nativeElement'].blur();
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.text : value;
  }

}
