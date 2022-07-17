import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { NgModule } from '@angular/core';
const exportcomponents = [SafeHtmlPipe];
@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule],
  exports: exportcomponents,
})
export class PipeModule {}
