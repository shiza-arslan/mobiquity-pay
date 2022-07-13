import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { PreloginRoutingModule } from './prelogin-routing.module';
import { PreLoginComponent } from './pre-login/pre-login.component';
@NgModule({
  declarations: [PreLoginComponent],
  imports: [CommonModule, SlickCarouselModule, PreloginRoutingModule],
})
export class PreloginModule {}
