import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { PreLoginComponent } from './view/pre-login/pre-login.component';
import { PreLoginSliderComponent } from './components/pre-login-slider/pre-login-slider.component';
import { PreLoginContentComponent } from './components/pre-login-content/pre-login-content.component';
import { LoginComponent } from '../home/components/login/login.component';
import { UICommonModule } from '../shared/components/ui-common/ui-common.module';
@NgModule({
  declarations: [PreLoginComponent, PreLoginSliderComponent, PreLoginContentComponent, LoginComponent],
  imports: [CommonModule, SlickCarouselModule, PreloginRoutingModule, UICommonModule],
})
export class PreloginModule {}
