import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataSourceAddComponent } from '@app/data-source/data-source-add/data-source-add.component';

const DATA_SOURCE_ADD_ROUTES: Routes = [
  {
    path: '', component: DataSourceAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(DATA_SOURCE_ADD_ROUTES)],
  exports: [RouterModule]
})
export class DataSourceAddRoutingModule {
}




