import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { PreLoginComponent } from './view/pre-login/pre-login.component';
import { PreLoginSliderComponent } from './components/pre-login-slider/pre-login-slider.component';
@NgModule({
  declarations: [PreLoginComponent, PreLoginSliderComponent],
  imports: [CommonModule, SlickCarouselModule, PreloginRoutingModule],
})
export class PreloginModule {}
