import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarDetailsComponent } from './avatar-details.component';

const routes: Routes = [
  { path: '', component: AvatarDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvatarDetailsRoutingModule {}
