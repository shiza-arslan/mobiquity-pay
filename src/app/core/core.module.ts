import { isDevMode, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { RouterModule } from '@angular/router';
import { InitializerModule } from './initializer/initializer.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { CommonModule } from '@angular/common';
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';
import { AppComponent } from './containers';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';

export const COMPONENTS = [AppComponent, ErrorPopupComponent, SuccessPopupComponent];
@NgModule({
  imports: [
    InitializerModule.forRoot(),
    InterceptorModule.forRoot(),
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  declarations: [COMPONENTS],
  exports: [AppComponent],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule && isDevMode()) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  /**
   * This is done so no providers will be re-registered if the module is imported lazily.
   */
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
