import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnalyticComponent } from '@app/analytic/analytic.component';
import { AnalyticResultsComponent } from '@app/analytic/results/analytic-results.component';

const ANALYTIC_ROUTES: Routes = [
  {
    path: ':id/results/plotly', component: AnalyticResultsComponent
  },
  {
    path: '', component: AnalyticComponent, children: [
      {path: ':id/results', pathMatch: 'full', component: AnalyticResultsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(ANALYTIC_ROUTES)],
  exports: [RouterModule],
})
export class AnalyticRoutingModule {

}

