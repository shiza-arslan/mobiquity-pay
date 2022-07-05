import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { SuccessPinComponent } from './success-pin/success-pin.component';

const exportcomponents = [ChangePinComponent, SuccessPinComponent];

@NgModule({
  declarations: exportcomponents,
  imports: [CommonModule],
  exports: exportcomponents,
})
export class ComponentsModule {}
