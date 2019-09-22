import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyListComponent } from './components/proxy-list/proxy-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FiltersComponent } from './components/filters/filters.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProxyRoutingModule } from '@app/proxy/proxy-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProxyRoutingModule,
    TranslateModule.forChild(),
    MatButtonModule,
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
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule
  ],
  declarations: [ProxyListComponent, FiltersComponent]
})
export class ProxyModule { }
