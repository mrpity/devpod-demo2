import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DataSourceDetailsComponent } from '@app/data-source/data-source-details/data-source-details.component';
import { StatisticsComponent } from '@app/data-source/data-source-details/components/statistics/statistics.component';
import { GeneralComponent } from '@app/data-source/data-source-details/components/general/general.component';
import {DocumentDetailsComponent} from '@app/data-source/data-source-details/components/document-details/document-details.component';

const DATA_SOURCE_DETAILS_ROUTES: Routes = [
  {
    path: '', component: DataSourceDetailsComponent, children: [
      { path: '', redirectTo: 'general' },
      { path: 'general', component: GeneralComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'document', component: DocumentDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(DATA_SOURCE_DETAILS_ROUTES)],
  exports: [RouterModule]
})
export class DataSourceDetailsRoutingModule {
}




