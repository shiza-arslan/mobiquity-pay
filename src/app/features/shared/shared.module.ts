import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  ComponentsModule,
  FooterComponent,
  HeaderComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DirectivesModule, ComponentsModule],
  declarations: [FooterComponent, HeaderComponent],
  exports: MODULES,
})
export class SharedModule {}
