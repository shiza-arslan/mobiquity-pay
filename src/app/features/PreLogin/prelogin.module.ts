import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { PreLoginComponent } from './view/pre-login/pre-login.component';
import { PreLoginSliderComponent } from './component/pre-login-slider/pre-login-slider.component';
import { PreLoginContentComponent } from './component/pre-login-content/pre-login-content.component';
import { LoginComponent } from './component/login/login.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [PreLoginComponent, PreLoginSliderComponent, PreLoginContentComponent, LoginComponent],
  imports: [CommonModule, SlickCarouselModule, PreloginRoutingModule, SharedModule],
})
export class PreloginModule {}
