import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProxyListComponent} from '@app/proxy/components/proxy-list/proxy-list.component';

const PROXY_ROUTES: Routes = [
  {
    path: '', component: ProxyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROXY_ROUTES)],
  exports: [RouterModule]
})
export class ProxyRoutingModule {
};
