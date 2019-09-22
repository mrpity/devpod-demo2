import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AutomationRuleListComponent } from './automation-rule-list.component';

@NgModule({
  declarations: [AutomationRuleListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forChild()
  ],
  exports: [AutomationRuleListComponent]
})
export class AutomationRuleListModule { }
