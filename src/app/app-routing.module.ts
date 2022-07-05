import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './features/pre-auth/components/access-denied/access-denied.component';
import { PreLoginComponent } from './features/pre-auth/components/pre-login/pre-login.component';
import { IpGeolocationBlockerGuard } from './features/shared/guard/ip-geolocation-blocker.guard';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
