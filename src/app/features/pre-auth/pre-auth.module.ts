import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './components/login/login.component';
import { PreLoginComponent } from './components/pre-login/pre-login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OtpComponent } from './components/otp/otp.component';
import { ForgetPinComponent } from './components/forget-pin/forget-pin.component';
import { SuccessPinComponent } from './components/success-pin/success-pin.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
@NgModule({
  declarations: [
    AccessDeniedComponent,
    LoginComponent,
    SignUpComponent,
    PreLoginComponent,
    OtpComponent,
    ForgetPinComponent,
    SuccessPinComponent,
    CustomerSupportComponent,
  ],
  imports: [SharedModule, SlickCarouselModule, NgOtpInputModule],
})
export class PreAuthModule {}
