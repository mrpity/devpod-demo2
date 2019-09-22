import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExportService} from '@app/avatar/services/export.service';

@Component({
  selector: 'app-export-string-row',
  templateUrl: './export-string-row.component.html',
  styleUrls: ['./export-string-row.component.scss']
})
export class ExportStringRowComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() isChecked: boolean;
  @Input() selectedSN: string[];
  @Input() name: string;
  @Output() change = new EventEmitter;

  warnings: any;

  constructor(private exportService: ExportService) { }

  ngOnInit() {
    this.warnings = this.exportService.getFieldDescription(this.name, this.selectedSN);
  }

  isPropertyExistInSN(snName) {
    return this.selectedSN.indexOf(snName.toUpperCase()) !== -1;
  }
}
