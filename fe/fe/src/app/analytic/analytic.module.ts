import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticRoutingModule } from '@app/analytic/analytic-routing.module';
import { AnalyticComponent } from './analytic.component';
import { AnalyticRequestsComponent } from '@app/analytic/requests/analytic-requests.component';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AnalyticFiltersComponent } from '@app/analytic/filters/analytic-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AnalyticResultsComponent } from './results/analytic-results.component';
import { SharedModule } from '@app/shared/shared.module';

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
  declarations: [
    AnalyticComponent,
    AnalyticRequestsComponent,
    AnalyticFiltersComponent,
    AnalyticResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticRoutingModule,
    MatProgressSpinnerModule,
    TranslateModule.forChild(),
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_FORMATS }
  ]
})
export class AnalyticModule { }
