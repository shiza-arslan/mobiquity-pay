import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, DirectivesModule, ComponentsModule];

@NgModule({
  imports: [MODULES],
  declarations: [],
  exports: MODULES,
})
export class SharedModule {}
