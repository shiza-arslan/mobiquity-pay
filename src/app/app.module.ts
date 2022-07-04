import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomSerializer } from '@mobiquity/utils';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@mobiquity/core';

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
  declarations: [AppComponent],
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
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: 'API_BASE_URL',
      useValue: environment.apiUrl,
    },
    {
      provide: 'STORAGE_PREFIX',
      useValue: 'mobiquity.pay',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
