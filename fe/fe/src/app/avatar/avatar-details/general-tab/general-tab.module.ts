import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralTabComponent } from './general-tab.component';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {AboutBlockComponent} from '@app/avatar/avatar-details/general-tab/about-block/about-block.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    GeneralTabComponent,
    AboutBlockComponent
  ],
  exports: [
    GeneralTabComponent
  ]
})
export class GeneralTabModule { }
