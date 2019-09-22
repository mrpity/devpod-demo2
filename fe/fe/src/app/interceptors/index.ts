import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackendInterceptor } from './fake-be.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
];
