import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
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
import { DataSourceFormComponent } from './data-source-form.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AutomationRuleListModule } from '../components/automation-rule-list/automation-rule-list.module';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AutomationRuleCreateModule } from '../components/automation-rule-create/automation-rule-create.module';
import { FileImportComponent } from '../data-source-import/components/file-import/file-import.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutomationRuleListModule,
    AutomationRuleCreateModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    CdkTableModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [
    DataSourceFormComponent,
    FileImportComponent
  ],
  exports: [
    DataSourceFormComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
})
export class DataSourceFormModule { }
