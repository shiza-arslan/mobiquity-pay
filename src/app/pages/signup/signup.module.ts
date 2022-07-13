import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SignupRoutingModule, UICommonModule],
})
export class SignupModule {}
