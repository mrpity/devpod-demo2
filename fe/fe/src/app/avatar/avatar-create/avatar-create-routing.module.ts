import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarCreateComponent } from './avatar-create.component';

const routes: Routes = [
  { path: '', component: AvatarCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvatarCreateRoutingModule {}
