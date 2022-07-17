import { NgModule } from '@angular/core';
import { PreloginModule } from '../home/prelogin.module';
import { SignupModule } from '../features/Registration/signup.module';
import { CommonModule } from '@angular/common';
import { UICommonModule } from '../shared/components/ui-common/ui-common.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, SignupModule, PreloginModule, UICommonModule],
})
export class FeatureModule {}
