import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { SuccessPinComponent } from './success-pin/success-pin.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SignupHeaderComponent } from './signup-header/signup-header.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PINBoxComponent } from './pin-box/pin-box.component';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { SelectBoxComponent } from './select-box/select-box.component';

const exportcomponents = [
  ChangePinComponent,
  SuccessPinComponent,
  FooterComponent,
  HeaderComponent,
  SignupHeaderComponent,
  InputBoxComponent,
  DatePickerComponent,
  ImageUploadComponent,
  PINBoxComponent,
  RadioButtonGroupComponent,
  SelectBoxComponent,
];
const ExportModules = [
  ChangePinComponent,
  SuccessPinComponent,
  FooterComponent,
  HeaderComponent,
  SignupHeaderComponent,
  InputBoxComponent,
  DatePickerComponent,
  ImageUploadComponent,
  PINBoxComponent,
  RadioButtonGroupComponent,
  SelectBoxComponent,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: ExportModules,
})
export class ComponentsModule {}
