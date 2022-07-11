import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { PreLoginComponent } from './pages/pre-login/pre-login.component';
import { IpGeolocationBlockerGuard } from './common/guards/ip-geolocation-blocker.guard';
import { SignUpComponent } from './pages/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    canActivate: [IpGeolocationBlockerGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
