import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
/**
 * Interceptor application module.
 */

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [HttpClientModule],
})
export class InterceptorModule {}
