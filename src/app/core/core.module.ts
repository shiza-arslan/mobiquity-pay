import { isDevMode, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { InitializerModule } from './initializer/initializer.module';
import { InterceptorModule } from './interceptors/interceptor.module';

@NgModule({
  imports: [InitializerModule.forRoot(), InterceptorModule.forRoot()],
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
