import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './features/pre-auth/components/access-denied/access-denied.component';
import { PreLoginComponent } from './features/pre-auth/components/pre-login/pre-login.component';
import { IpGeolocationBlockerGuard } from './features/shared/guard/ip-geolocation-blocker.guard';
import { SignUpComponent } from './features/pre-auth/components/signup/signup.component';
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
