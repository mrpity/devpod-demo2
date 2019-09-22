import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebDetailsComponent } from './web-details.component';
import { WebGeneralComponent } from './web-general/web-general.component';
import { WebOriginsComponent } from './web-origins/web-origins.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
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

@NgModule({
  declarations: [WebDetailsComponent, WebGeneralComponent, WebOriginsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    SharedModule,
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
    MatChipsModule
  ],
  exports: [WebDetailsComponent, WebGeneralComponent]
})
export class WebDetailsModule { }
