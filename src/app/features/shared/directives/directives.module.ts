import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from './number-only-directive';

const exportdirectives = [NumberOnlyDirective];

@NgModule({
  declarations: exportdirectives,
  imports: [CommonModule],
  exports: exportdirectives,
})
export class DirectivesModule {}
