import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { ResultProfileComponent } from './results/result-profile/result-profile.component';
import { ResultWebComponent } from '@app/search/results/result-web/result-web.component';
import { ResultPostComponent } from '@app/search/results/result-post/result-post.component';

const SEARCH_ROUTES: Routes = [
  {
    path: ':id/results/post/:index/:documentId/:tabs', component: ResultPostComponent
  },
  {
    path: ':id/results/profile/:index/:documentId/:tabs', component: ResultProfileComponent
  },
  {
    path: ':id/results/webpage/:index/:documentId/:tabs', component: ResultWebComponent
  },
  {
    path: '', component: SearchComponent, children: [
      { path: ':id/results', pathMatch: 'full', component: ResultsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(SEARCH_ROUTES)],
  exports: [RouterModule],
})
export class SearchRoutingModule {

}




