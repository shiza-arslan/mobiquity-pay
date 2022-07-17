import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/ui-common/footer/footer.component';
import { LogoHeaderComponent } from './components/layout/logo-header/logo-header.component';
import { WelcomeHeaderComponent } from './components/layout/welcome-header/welcome-header.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './view/layout/layout.component';
import { SignupHeaderComponent } from './components/layout/signup-header/signup-header.component';
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
const ExportModules = [
  FormsModule,
  ReactiveFormsModule,
  FooterComponent,
  LogoHeaderComponent,
  WelcomeHeaderComponent,
  NavigationComponent,
  LayoutComponent,
  SignupHeaderComponent,
];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, PipeModule, RouterModule],
  exports: ExportModules,
})
export class SharedModule {}
