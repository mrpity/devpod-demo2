import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DiffList } from '@app/avatar/models/avatar-override-diff.model';

@Component({
  selector: 'app-list-row',
  templateUrl: './list-row.component.html',
  styleUrls: ['./list-row.component.scss']
})
export class ListRowComponent {
  @Input() label: string;
  @Input() field: DiffList;
  @Input() isChecked: boolean;
  @Output() change = new EventEmitter;

  constructor(public translate: TranslateService) {}

  isMultiLines() {
    return (this.field['current'] && this.field['current'].length > 1)
      || (this.field['imported'] && this.field['imported'].length > 1);
  }
}
