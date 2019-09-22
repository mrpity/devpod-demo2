import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DiffString } from '@app/avatar/models/avatar-override-diff.model';

@Component({
  selector: 'app-string-row',
  templateUrl: './string-row.component.html',
  styleUrls: ['./string-row.component.scss']
})
export class StringRowComponent {
  @Input() label: string;
  @Input() field: DiffString;
  @Input() isChecked: boolean;
  @Output() change = new EventEmitter;

  constructor(public translate: TranslateService) { }
}
