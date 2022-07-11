import { NgModule } from '@angular/core';
import { PreLoginComponent } from './pre-login/pre-login.component';
import { SignUpComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { UICommonModule } from '../shared/ui-common/ui-common.module';
import { LoginComponent } from './login/login.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [PreLoginComponent, SignUpComponent, LoginComponent],
  imports: [CommonModule, UICommonModule, SlickCarouselModule],
})
export class PagesModule {}
