import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksTabComponent } from './links-tab.component';
import { SnLinkComponent } from './sn-link/sn-link.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { ImportExportComponent } from './import-export/import-export.component';
import { OverrideDiffTableComponent } from './override-diff-table/override-diff-table.component';
import { StringRowComponent } from './override-diff-table/components/string-row/string-row.component';
import { ListRowComponent } from './override-diff-table/components/list-row/list-row.component';
import { LoggingComponent } from './import-export/logging/logging.component';
import { SnImportComponent } from './import-export/sn-import/sn-import.component';
import { SnExportComponent } from './import-export/sn-export/sn-export.component';
import { ExportDiffTableComponent } from './export-diff-table/export-diff-table.component';
import { ExportStringRowComponent } from './export-diff-table/components/export-string-row/export-string-row.component';
import { ExportListRowComponent } from './export-diff-table/components/export-list-row/export-list-row.component';
import { ExportSummaryTableComponent } from './export-summary-table/export-summary-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatInputModule,
    MatIconModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    SatPopoverModule
  ],
  declarations: [
    LinksTabComponent,
    SnLinkComponent,
    ImportExportComponent,
    OverrideDiffTableComponent,
    StringRowComponent,
    ListRowComponent,
    LoggingComponent,
    SnImportComponent,
    SnExportComponent,
    ExportDiffTableComponent,
    ExportStringRowComponent,
    ExportListRowComponent,
    ExportSummaryTableComponent,
  ],
  exports: [
    LinksTabComponent
  ]
})
export class LinksTabModule { }
