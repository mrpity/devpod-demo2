import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarListComponent } from '@app/avatar/avatar-list/avatar-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { AllFiltersModalComponent } from './all-filters-modal/all-filters-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AvatarListRoutingModule } from './avatar-list-routing.module';

@NgModule({
  imports: [
    AvatarListRoutingModule,
    CommonModule,
    SharedModule,
    MatTableModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    TranslateModule.forChild(),
    MatButtonModule
  ],
  declarations: [
    AvatarListComponent,
    FiltersComponent,
    AllFiltersModalComponent
  ],
  entryComponents: [
    AllFiltersModalComponent
  ]
})
export class AvatarListModule { }
