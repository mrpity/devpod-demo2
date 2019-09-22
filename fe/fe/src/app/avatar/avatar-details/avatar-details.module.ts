import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarDetailsComponent } from './avatar-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralTabModule } from '@app/avatar/avatar-details/general-tab/general-tab.module';
import { LinksTabModule } from '@app/avatar/avatar-details/links-tab/links-tab.module';
import { RouterModule } from '@angular/router';
import { AvatarDetailsRoutingModule } from './avatar-details-routing.module';

@NgModule({
  imports: [
    AvatarDetailsRoutingModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    GeneralTabModule,
    LinksTabModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [AvatarDetailsComponent]
})
export class AvatarDetailsModule { }
