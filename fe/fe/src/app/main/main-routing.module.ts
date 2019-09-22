import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { MainComponent } from '@app/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'avatar',
        loadChildren: () => import('../avatar/avatar.module').then(
          ({ AvatarModule }) => AvatarModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'data-source',
        loadChildren: () => import('../data-source/data-source.module').then(
          ({ DataSourceModule }) => DataSourceModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'proxy',
        loadChildren: () => import('../proxy/proxy.module').then(
          ({ ProxyModule }) => ProxyModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(
          ({ SearchModule }) => SearchModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'analytic',
        loadChildren: () => import('../analytic/analytic.module').then(
          ({ AnalyticModule }) => AnalyticModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(
          ({ UserModule }) => UserModule
        ),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'avatar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
