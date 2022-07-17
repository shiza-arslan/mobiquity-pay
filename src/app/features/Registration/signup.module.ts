import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './view/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SignupRoutingModule],
})
export class SignupModule {}
