import { NgModule } from '@angular/core';
import { PreloginModule } from './prelogin/prelogin.module';
import { SignupModule } from './signup/signup.module';
import { CommonModule } from '@angular/common';
import { UICommonModule } from '../shared/ui-common/ui-common.module';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UICommonModule, SignupModule, PreloginModule],
})
export class PagesModule {}
