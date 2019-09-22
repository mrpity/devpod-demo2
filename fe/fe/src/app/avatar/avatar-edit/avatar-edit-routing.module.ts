import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarEditComponent } from './avatar-edit.component';

const routes: Routes = [
  { path: '', component: AvatarEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvatarEditRoutingModule {}
