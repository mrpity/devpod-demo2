import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { AddAboutItemModalComponent } from './components/add-about-item-modal/add-about-item-modal.component';
import { AboutBlockItemComponent } from './components/about-block-item/about-block-item.component';
import { EducationComponent } from './components/education/education.component';
import { AddEducationModalComponent } from './components/add-education-modal/add-education-modal.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { AddGeolocationModalComponent } from './components/add-geolocation-modal/add-geolocation-modal.component';
import { AddOccupationComponent } from './components/add-occupation/add-occupation.component';
import { AvatarFormComponent } from './avatar-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MaritalStatusComponent } from './components/marital-status/marital-status.component';
import { AddMaritalStatusModalComponent } from './components/add-marital-status-modal/add-marital-status-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AvatarFormComponent,
    AddAboutItemModalComponent,
    AboutBlockItemComponent,
    EducationComponent,
    AddEducationModalComponent,
    AddOccupationComponent,
    GeolocationComponent,
    AddGeolocationModalComponent,
    MaritalStatusComponent,
    AddMaritalStatusModalComponent
  ],
  exports: [
    AvatarFormComponent,
    AddAboutItemModalComponent,
    AboutBlockItemComponent,
    EducationComponent,
    AddEducationModalComponent,
    AddOccupationComponent,
    GeolocationComponent,
    AddGeolocationModalComponent,
    MaritalStatusComponent,
    AddMaritalStatusModalComponent
  ],
  entryComponents: [
    AddAboutItemModalComponent,
    AddEducationModalComponent,
    AddGeolocationModalComponent,
    AddMaritalStatusModalComponent
  ]
})
export class AvatarFormModule {}
