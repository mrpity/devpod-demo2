import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './components/general/general.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DataSourceDetailsComponent } from '@app/data-source/data-source-details/data-source-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
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
import { CdkTableModule } from '@angular/cdk/table';
import { DataSourceDetailsRoutingModule } from '@app/data-source/data-source-details/data-source-details-routing.module';
import { ClipboardModule } from 'ngx-clipboard';
import { AutomationRuleListModule } from '../components/automation-rule-list/automation-rule-list.module';
// tslint:disable-next-line
import { HistoryLogComponent } from '@app/data-source/data-source-details/components/statistics/components/history-log/history-log.component';
import { HistoryRowComponent } from './components/statistics/components/history-row/history-row.component';
import { DocumentDetailsComponent } from '@app/data-source/data-source-details/components/document-details/document-details.component';
import { PostDetailsModule } from '@app/shared/components/post-details/post-details.module';
import { WebDetailsModule } from '@app/shared/components/web-details/web-details.module';
import { ProfileModule } from '@app/shared/components/profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    AutomationRuleListModule,
    DataSourceDetailsRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
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
    MatOptionModule,
    MatSelectModule,
    CdkTableModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    ClipboardModule,
    PostDetailsModule,
    WebDetailsModule,
    ProfileModule
  ],
  declarations: [
    GeneralComponent,
    StatisticsComponent,
    DataSourceDetailsComponent,
    HistoryLogComponent,
    HistoryRowComponent,
    DocumentDetailsComponent
  ]
})
export class DataSourceDetailsModule { }
