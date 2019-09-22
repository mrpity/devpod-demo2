import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { AwayGuard } from '@app/core/guards/away.guard';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'list', component: UserListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'create', component: UserCreateComponent, canDeactivate: [AwayGuard] },
      { path: 'details/:id', component: UserDetailsComponent },
      { path: 'edit/:id', component: UserEditComponent, canDeactivate: [AwayGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
