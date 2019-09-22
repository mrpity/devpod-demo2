import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataSourceComponent } from './data-source.component';
import { DataSourceListComponent } from '@app/data-source/data-source-list/data-source-list.component';
import { DataSourceEditComponent } from '@app/data-source/data-source-edit/data-source-edit.component';
import { DataSourceImportComponent } from '@app/data-source/data-source-import/data-source-import.component';
import { DataSourceAddComponent } from './data-source-add/data-source-add.component';

const DATA_SOURCE_ROUTES: Routes = [
  {
    path: '', component: DataSourceComponent, children: [
      { path: 'list', component: DataSourceListComponent },
      { path: '', redirectTo: 'list' },
      { path: 'add', component: DataSourceAddComponent },
      { path: 'import', component: DataSourceImportComponent },
      {
        path: 'details/:id',
        loadChildren: () => import('./data-source-details/data-source-details.module').then(
          ({ DataSourceDetailsModule }) => DataSourceDetailsModule
        ),
      },
      { path: 'edit/:id', component: DataSourceEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(DATA_SOURCE_ROUTES)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule {
}




