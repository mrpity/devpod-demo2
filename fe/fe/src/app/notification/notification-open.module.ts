import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationOpenComponent } from './notification-open/notification-open.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule.forChild()
  ],
  declarations: [
    NotificationOpenComponent,
  ],
  exports: [
    NotificationOpenComponent,
  ]
})
export class NotificationOpenModule { }
