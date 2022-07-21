import { NgModule } from '@angular/core';
import { PreloginModule } from './PreLogin/prelogin.module';
import { SignupModule } from '../features/Registration/signup.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [],
  imports: [CommonModule, SignupModule, PreloginModule],
})
export class FeatureModule {}
