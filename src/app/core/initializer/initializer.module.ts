import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

/**
 * This function perform AX translations initialization.
 * We are using the app initializer to be sure that the AX translations available
 * before the AX views are rendered.
 * @param translate The translate service instance.
 */
export function translationInitializerFactory(translateService: TranslateService): () => Promise<unknown> {
  return () => {
    translateService.setDefaultLang('en');
    return lastValueFrom(translateService.use('en'));
  };
}

/**
 * Interceptor application module.
 */
@NgModule()
export class InitializerModule {
  /**
   * This is done so no providers will be re-registered if the module is imported lazily.
   */
  public static forRoot(): ModuleWithProviders<InitializerModule> {
    return {
      ngModule: InitializerModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: translationInitializerFactory,
          deps: [TranslateService],
          multi: true,
        },
      ],
    };
  }
}
