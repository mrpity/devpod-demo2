import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from '@app/main/main-routing.module';
import { SidebarComponent } from '@app/main/components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationOpenModule } from '@app/notification/notification-open.module';
import { NotificationModule } from '@app/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MatMenuModule,
    MatIconModule,
    NotificationModule,
    NotificationOpenModule,
    TranslateModule.forChild()
  ],
  declarations: [
    MainComponent,
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ]
})
export class MainModule { }
