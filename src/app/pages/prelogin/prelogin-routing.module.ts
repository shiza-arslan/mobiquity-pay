import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreLoginComponent } from './pre-login/pre-login.component';

const routes: Routes = [{ path: '', component: PreLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreloginRoutingModule {}
