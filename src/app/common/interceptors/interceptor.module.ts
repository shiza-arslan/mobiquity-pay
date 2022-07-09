import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';

/**
 * Interceptor application module.
 */
@NgModule()
export class InterceptorModule {
  /**
   * This is done so no providers will be re-registered if the module is imported lazily.
   */
  public static forRoot(): ModuleWithProviders<InterceptorModule> {
    return {
      ngModule: InterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
