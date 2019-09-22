import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@app/search/search.component';
import { SearchRoutingModule } from '@app/search/search-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { ResultsComponent } from './results/results.component';
import { RequestsComponent } from './requests/requests.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ProfileModule } from '@app/shared/components/profile/profile.module';
import { ResultProfileComponent } from './results/result-profile/result-profile.component';
import { ResultWebComponent } from './results/result-web/result-web.component';
import { WebDetailsModule } from '@app/shared/components/web-details/web-details.module';
import { PostDetailsModule } from '@app/shared/components/post-details/post-details.module';
import { ResultPostComponent } from '@app/search/results/result-post/result-post.component';

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
    SearchRoutingModule,
    ProfileModule,
    TranslateModule.forChild(),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    WebDetailsModule,
    PostDetailsModule
  ],
  declarations: [
    SearchComponent,
    FiltersComponent,
    ResultsComponent,
    RequestsComponent,
    ResultProfileComponent,
    ResultWebComponent,
    ResultPostComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_FORMATS }
  ]
})
export class SearchModule { }
