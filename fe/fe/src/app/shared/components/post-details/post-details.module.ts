import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';
import { PostGeneralComponent } from './post-general/post-general.component';
import { PostOriginsComponent } from './post-origins/post-origins.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {RepostsComponent} from '@app/shared/components/post-details/post-general/reposts/reposts.component';
import {ReactionsComponent} from '@app/shared/components/post-details/post-general/reactions/reactions.component';
import {CommentsComponent} from '@app/shared/components/post-details/post-general/comments/comments.component';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostGeneralComponent,
    PostOriginsComponent,
    RepostsComponent,
    ReactionsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [PostDetailsComponent, PostGeneralComponent]
})
export class PostDetailsModule { }
