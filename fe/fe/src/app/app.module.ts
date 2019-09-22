import {
  NgModule,
  NgModuleFactoryLoader,
} from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppStoreModule, RootStoreState } from './store'; // import Store data: module, reducers
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CustomMatPaginatorIntl } from '@app/shared/providers/paginator-intl';
import { httpInterceptorProviders } from '@app/interceptors';
import { Store } from '@ngrx/store';
import { ErrorActions } from '@app/store/actions';
import { RetryLink } from 'apollo-link-retry';
import { MyNgModuleLoader } from '@app/core/MyNgModuleLoader.module';
import { ErrorCodes } from '@app/models/error.model';
import { AuthService } from '@app/core/services/auth.service';
import { OperationName } from '@app/models/app.enums';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/countries/', suffix: '.countries.json' },
  ]);
}
registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppStoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    CommonModule,
    HttpLinkModule,
    NgbModule,
    HttpClientModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    httpInterceptorProviders,
    { provide: NgModuleFactoryLoader, useClass: MyNgModuleLoader },
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink,
              private router: Router,
              private store$: Store<RootStoreState.State>,
              private authService: AuthService) {
    const http = httpLink.create({ uri: environment.api });

    const authMiddleware = new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('token');
      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
      }
      return forward(operation);
    });

    /** Graphql error handler */
    const error = onError(({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        const {operationName} = operation;
        graphQLErrors.map(({message}) => {
          this.store$.dispatch(new ErrorActions.GraphqlRequestError({message, operationName}));
          return { message };
        });
      }
    });

    /** Network error handler (currently apollo-link-retry supports only network errors)
     * TODO: merge handlers after apollo-link-retry update
     * */
    const retry = new RetryLink({
      delay: {
        initial: 500,
        max: Infinity,
        jitter: true
      },
      attempts: (count, operation, fail) => {
        const maxRetries = 5;
        const {operationName} = operation;
        /** Clear login data after first failed "LOGOUT" request and continue retrying */
        if (operationName === OperationName.logout && count === 1) {
          this.authService.clearLoginData();
        }
        switch (fail['status']) {
          case ErrorCodes.UNKNOWN:
          case ErrorCodes.GATEWAY_TIMEOUT: {
            /** After maxRetries show "OFFLINE" message */
            if (count === maxRetries) {
              this.store$.dispatch(new ErrorActions.GoOffline());
              return false;
            }
            break;
          }
          case ErrorCodes.UNAUTHORIZED: {
            this.router.navigate(['login']);
            return false;
          }
        }
        /** Continue trying if FAIL object and maxRetries */
        return !!fail && count < maxRetries;
      }
    });

    apollo.create({
      link: ApolloLink.from([error, retry, authMiddleware, http]),
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'none'
        }
      }
    });
  }
}
