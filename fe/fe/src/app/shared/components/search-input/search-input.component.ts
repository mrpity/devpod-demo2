import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() searchValue: string;
  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  applySearch(value) {
    this.searchChange.emit(value);
  }
  removeSearch(value) {
    this.searchChange.emit(value);
  }
}
