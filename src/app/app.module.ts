import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomSerializer } from '@mobiquity/utils';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CoreModule } from '@mobiquity/core';
import { PreAuthModule } from './features/pre-auth/pre-auth.module';
import { AppComponent } from './core/containers';
/**
 * AoT requires an exported function for factories
 *
 * @param http Http client.
 * @returns Translate http loader.
 */
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    PreAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
