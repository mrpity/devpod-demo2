import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarCreateComponent } from './avatar-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarFormModule } from '../avatar-form/avatar-form.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AwayGuard } from '@app/core/guards/away.guard';
import { AvatarCreateRoutingModule } from './avatar-create-routing.module';

@NgModule({
  imports: [
    AvatarCreateRoutingModule,
    CommonModule,
    AvatarFormModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild(),
    MatButtonModule
  ],
  declarations: [
    AvatarCreateComponent
  ],
  providers: [
    AwayGuard
  ]
})
export class AvatarCreateModule { }
