import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChangePinComponent } from './components/change-pin/change-pin.component';
import { SuccessPinComponent } from './components/success-pin/success-pin.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PINBoxComponent } from './components/pin-box/pin-box.component';
import { RadioButtonGroupComponent } from './components/radio-button-group/radio-button-group.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { OtpComponent } from './components/otp/otp.component';
import { ForgetPinComponent } from './components/forget-pin/forget-pin.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxSpinnerModule } from 'ngx-spinner';
const exportcomponents = [
  ChangePinComponent,
  SuccessPinComponent,
  InputBoxComponent,
  DatePickerComponent,
  ImageUploadComponent,
  PINBoxComponent,
  RadioButtonGroupComponent,
  SelectBoxComponent,
  ForgetPinComponent,
  OtpComponent,
  CustomerSupportComponent,
  AccessDeniedComponent,
];
const ExportModules = [
  ChangePinComponent,
  SuccessPinComponent,
  InputBoxComponent,
  DatePickerComponent,
  ImageUploadComponent,
  PINBoxComponent,
  RadioButtonGroupComponent,
  SelectBoxComponent,
  ForgetPinComponent,
  CustomerSupportComponent,
  OtpComponent,
  FormsModule,
  ReactiveFormsModule,
  AccessDeniedComponent,
];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOtpInputModule, NgxSpinnerModule],
  exports: ExportModules,
})
export class SharedModule {}
