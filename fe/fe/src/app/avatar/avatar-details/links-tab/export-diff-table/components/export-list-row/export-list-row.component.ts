import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExportService} from '@app/avatar/services/export.service';

@Component({
  selector: 'app-export-list-row',
  templateUrl: './export-list-row.component.html',
  styleUrls: ['./export-list-row.component.scss']
})
export class ExportListRowComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() selectedSN: string[];
  @Input() isChecked: boolean;
  @Input() name: string;
  @Output() change = new EventEmitter;

  warnings: any;

  constructor(private exportService: ExportService) { }

  ngOnInit() {
    this.warnings = this.exportService.getFieldDescription(this.name, this.selectedSN);
  }
  isMultiLines() {
    return this.value && this.value.length > 1;
  }

  isPropertyExistInSN(snName) {
    return this.selectedSN.indexOf(snName.toUpperCase()) !== -1;
  }
}
