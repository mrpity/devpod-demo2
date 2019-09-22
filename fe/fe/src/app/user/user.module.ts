import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserRoutingModule } from './user-routing.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UserComponent } from './user.component';
import { UserListModule } from './user-list/user-list.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserEditModule } from './user-edit/user-edit.module';
import { UserCreateModule } from './user-create/user-create.module';
import { APP_DATE_FORMATS } from '@app/models/app.enums';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    RouterModule,
    UserListModule,
    UserDetailsModule,
    UserEditModule,
    UserCreateModule,
    TranslateModule.forChild()
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class UserModule { }
