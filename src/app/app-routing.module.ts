import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { IpGeolocationBlockerGuard } from './common/guards/ip-geolocation-blocker.guard';
const routes: Routes = [
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  { path: 'signup', loadChildren: () => import('./features/Registration/signup.module').then((m) => m.SignupModule) },
  { path: 'pre-login', loadChildren: () => import('./home/prelogin.module').then((m) => m.PreloginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
