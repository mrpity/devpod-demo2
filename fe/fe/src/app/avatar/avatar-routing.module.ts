import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
// import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { AvatarComponent } from './avatar.component';
// import { AvatarCrudComponent } from './avatar-crud/avatar-crud.component';
// import { AvatarCreateComponent } from './avatar-create/avatar-create.component';
// import { AvatarDetailsComponent } from './avatar-details/avatar-details.component';
// import { AvatarEditComponent } from './avatar-edit/avatar-edit.component';
import { AwayGuard } from '@app/core/guards/away.guard';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AvatarComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./avatar-list/avatar-list.module').then(
          ({ AvatarListModule }) => AvatarListModule
        )
      },
      {
        path: 'create',
        // canDeactivate: [AwayGuard],
        loadChildren: () => import('./avatar-create/avatar-create.module').then(
          ({ AvatarCreateModule }) => AvatarCreateModule
        )
      },
      {
        path: 'details/:id/:tab',
        loadChildren: () => import('./avatar-details/avatar-details.module').then(
          ({ AvatarDetailsModule }) => AvatarDetailsModule
        )
      },
      { path: 'details/:id', redirectTo: 'details/:id/general', pathMatch: 'full' },
      {
        path: 'edit/:id',
        // canDeactivate: [AwayGuard],
        loadChildren: () => import('./avatar-edit/avatar-edit.module').then(
          ({ AvatarEditModule }) => AvatarEditModule
        )
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  exports: [RouterModule]
})
export class AvatarRoutingModule {}
