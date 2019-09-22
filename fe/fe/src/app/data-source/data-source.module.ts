import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceComponent } from './data-source.component';
import { DataSourceRoutingModule } from './data-source-routing.module';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSourceService } from '@app/data-source/services/data-source.service';
import { SharedModule } from '@app/shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { SaveSnackbarComponent } from './components/save-snackbar/save-snackbar.component';
import { TimeFramePipe } from '../shared/pipes/time-frame.pipe';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AutomationRuleListModule } from './components/automation-rule-list/automation-rule-list.module';
import { DataSourceAddModule } from './data-source-add/data-source-add.module';
import { DataSourceEditModule } from './data-source-edit/data-source-edit.module';
import { DataSourceImportModule } from './data-source-import/data-source-import.module';
import { ListFiltersComponent } from './data-source-list/list-filters/list-filters.component';

export const APP_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    DataSourceRoutingModule,
    AutomationRuleListModule,
    DataSourceAddModule,
    DataSourceEditModule,
    DataSourceImportModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule,
    CdkTableModule,
    TranslateModule.forChild(),
    MatDividerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule
  ],
  declarations: [
    DataSourceComponent,
    DataSourceListComponent,
    SaveSnackbarComponent,
    TimeFramePipe,
    ListFiltersComponent
  ],
  providers: [
    DataSourceService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_FORMATS }
  ]
})
export class DataSourceModule { }
