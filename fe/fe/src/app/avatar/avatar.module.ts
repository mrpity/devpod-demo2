import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarRoutingModule } from './avatar-routing.module';
import { AvatarComponent } from './avatar.component';
// import { AvatarCrudModule } from './avatar-crud/avatar-crud.module';
// import { AvatarListModule } from './avatar-list/avatar-list.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
    AvatarRoutingModule,
    // AvatarCrudModule,
    // AvatarListModule,
    CommonModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [
    AvatarComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_FORMATS }
  ]
})
export class AvatarModule { }
