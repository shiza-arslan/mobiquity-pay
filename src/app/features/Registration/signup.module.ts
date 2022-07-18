import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './view/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupSliderComponent } from './components/signup-slider/signup-slider.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { UICommonModule } from 'src/app/shared/components/ui-common/ui-common.module';
@NgModule({
  declarations: [SignupComponent, SignupSliderComponent, SignupFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SignupRoutingModule, UICommonModule],
})
export class SignupModule {}
