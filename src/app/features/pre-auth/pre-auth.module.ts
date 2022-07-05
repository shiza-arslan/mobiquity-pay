import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './components/login/login.component';
import { PreLoginComponent } from './components/pre-login/pre-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [AccessDeniedComponent, LoginComponent, SignupComponent, PreLoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, SlickCarouselModule],
})
export class PreAuthModule {}
