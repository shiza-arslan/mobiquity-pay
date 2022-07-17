import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LogoHeaderComponent } from './logo-header/logo-header.component';
import { WelcomeHeaderComponent } from './welcome-header/welcome-header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SignupHeaderComponent } from './signup-header/signup-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipeModule } from '@mobiquity/PipeModule';
const exportcomponents = [
  FooterComponent,
  LogoHeaderComponent,
  WelcomeHeaderComponent,
  NavigationComponent,
  LayoutComponent,
  SignupHeaderComponent,
];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule, RouterModule, NgxSpinnerModule, PipeModule],
  exports: exportcomponents,
})
export class LayoutModule {}
