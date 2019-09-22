import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(
      ({ AuthModule }) => AuthModule
    )
  },
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then(
      ({ MainModule }) => MainModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
