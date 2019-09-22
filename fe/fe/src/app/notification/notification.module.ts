import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationListTabComponent } from './notification-list-tab/notification-list-tab.component';
import { NotificationListItemComponent } from './notification-list-item/notification-list-item.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    NotificationListComponent,
    NotificationListTabComponent,
    NotificationListItemComponent,
  ],
  exports: [
    NotificationListComponent
  ]
})
export class NotificationModule { }
