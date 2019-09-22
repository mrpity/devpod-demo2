import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralTabModule } from '@app/avatar/avatar-details/general-tab/general-tab.module';
import { LinksTabModule } from '@app/avatar/avatar-details/links-tab/links-tab.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    GeneralTabModule,
    LinksTabModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [UserDetailsComponent]
})
export class UserDetailsModule { }
