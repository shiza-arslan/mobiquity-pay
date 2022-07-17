import { NgModule } from '@angular/core';
import { PreloginModule } from '../home/prelogin.module';
import { SignupModule } from './signup/signup.module';
import { CommonModule } from '@angular/common';
import { UICommonModule } from '../shared/components/ui-common/ui-common.module';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SignupModule, PreloginModule, UICommonModule],
})
export class PagesModule {}
