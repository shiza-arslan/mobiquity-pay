import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/ui-common/footer/footer.component';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';
import { WelcomeHeaderComponent } from './components/welcome-header/welcome-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './view/layout/layout.component';
import { SignupHeaderComponent } from './components/signup-header/signup-header.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipeModule } from '@mobiquity/PipeModule';
const exportcomponents = [
  FooterComponent,
  LogoHeaderComponent,
  WelcomeHeaderComponent,
  NavigationComponent,
  LayoutComponent,
  SignupHeaderComponent,
  AccessDeniedComponent,
];
const ExportModules = [
  FormsModule,
  ReactiveFormsModule,
  FooterComponent,
  LogoHeaderComponent,
  WelcomeHeaderComponent,
  NavigationComponent,
  LayoutComponent,
  SignupHeaderComponent,
  AccessDeniedComponent,
];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, PipeModule, RouterModule],
  exports: ExportModules,
})
export class SharedModule {}
