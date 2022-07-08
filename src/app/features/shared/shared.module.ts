import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
const MODULES = [CommonModule, DirectivesModule, ComponentsModule];

@NgModule({
  imports: MODULES,
  declarations: [],
  exports: MODULES,
})
export class SharedModule {}
