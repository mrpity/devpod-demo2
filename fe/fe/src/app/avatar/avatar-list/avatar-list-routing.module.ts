import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarListComponent } from './avatar-list.component';

const routes: Routes = [
  { path: '', component: AvatarListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvatarListRoutingModule {}
