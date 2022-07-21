import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FooterComponent } from './component/footer/footer.component';
import { LogoHeaderComponent } from '../home/component/logo-header/logo-header.component';
import { WelcomeHeaderComponent } from '../home/component/welcome-header/welcome-header.component';
import { NavigationComponent } from '../home/component/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../home/view/layout/layout.component';
import { SignupHeaderComponent } from '../home/component/signup-header/signup-header.component';
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
export class HomeModule {}
