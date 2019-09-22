import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, delay, materialize, dematerialize, map } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  i = 0;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(
      mergeMap(() => {
        if (request.url.endsWith('/graphql') && request.method === 'POST') {
          switch (request.body.operationName) {
            // case 'setupAvatarConnection':
            //   console.log(request);
            //   return this.getMockUserList().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { data: { importAvatarProfile: true } } });
            //     })
            //   );
            // case 'getUserList':
            //   console.log(request);
            //   return this.getMockUserList().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { data: { getUserList: data } } });
            //     })
            //   );
            // case 'getUserDetails':
            //   console.log(request);
            //   return this.getMockUserDetails().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { data: { getUserDetails: data } } });
            //     })
            //   );
            // case 'modifyUser':
            //   console.log(request);
            //   return of(new HttpResponse({ status: 200, body: { data: true } }));
            // case 'createUser':
            //   console.log(request);
            //   return of(new HttpResponse({ status: 200, body: { data: true } }));
            // case 'getDataSourceStatistic':
            //   return this.getDsLogsMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );
            // case 'getAvatarExportStatus':
            //   return (this.i % 2 === 0 ? this.getMockAvatarExportProgressSummary() : this.getMockAvatarExportFinishedSummary()).pipe(
            //     map(data => {
            //       console.log(this.i);
            //       this.i++;
            //       return new HttpResponse({ status: 200, body: { data: { getAvatarExportStatus: data } } });
            //     })
            //   );
            // case 'getPost':
            //   return this.getPostMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

            // case 'getWebPage':
            //   return this.getWebPageMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

            // case 'getProfile':
            //   return this.getProfileMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );
            //
            //
            // case 'getDataSourceDetails':
            // return this.getDsDetailsMock().pipe(
            //   map(data => {
            //     return new HttpResponse({ status: 200, body: { ...data }});
            //   })
            // );
            //
            // case 'getDocumentInfo':
            //   return this.getDocumentInfoMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );
            // case 'getHostLocation':
            //   return this.getProxyLocationMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

            // case 'getDataSources':
            //   return this.getDataSourcesMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );


            // case 'getAnalyticRequests':
            //   return this.getAnalyticRequestsMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

            // case 'saveSearchAnalyticRequest':
            //   return this.saveSearchAnalyticRequestMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

            // case 'getAnalyticSearchRequest':
            //   return this.getAnalyticSearchRequestMock().pipe(
            //     map(data => {
            //       return new HttpResponse({ status: 200, body: { ...data }});
            //     })
            //   );

              // case 'getAnalyticResults':
              // return this.getAnalyticResultsMock().pipe(
              //   map(data => {
              //     return new HttpResponse({ status: 200, body: { ...data }});
              //   })
              // );
            default:
          }
        }
        // pass through any requests not handled above
        return next.handle(request).pipe(
          map(event => {
            if (event instanceof HttpResponse && event.url.endsWith('/graphql')) {
              // event = event.clone({ body: event.body.data });
              // console.log('EVENT = ', event);
              return event;
            }
            return event;
          }));
      }),
      // call materialize and dematerialize to ensure delay
      // even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      materialize(),
      delay(500),
      dematerialize()
    );
  }

  public getMockUserList(): Observable<any> {
    return this.http.get('./assets/mocks/mock-user-list.json');
  }

  public getMockUserDetails(): Observable<any> {
    return this.http.get('./assets/mocks/mock-user-details.json');
  }

  public getMockAvatarExportProgressSummary(): Observable<any> {
    return this.http.get('./assets/mocks/mock-avatar-export-progress-summary.json');
  }

  public getMockAvatarExportFinishedSummary(): Observable<any> {
    return this.http.get('./assets/mocks/mock-avatar-export-finished-summary.json');
  }

  public getDsLogsMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-ds-logs.json');
  }

  public getPostMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-post-details.json');
  }

  public getProxyLocationMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-proxy-location.json');
  }

  public getDocumentInfoMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-document-info.json');
  }

  public getDsDetailsMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-ds-details.json');
  }

  public getDataSourcesMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-ds-list.json');
  }

  public getWebPageMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-webpage-details.json');
  }

  public getProfileMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-profile-details.json');
  }

  public getAnalyticRequestsMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-analytic-requests.json');
  }

  public saveSearchAnalyticRequestMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-save-search-analytic-request.json');
  }

  public getAnalyticSearchRequestMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-analytic-search-request.json');
  }

  public getAnalyticResultsMock(): Observable<any> {
    return this.http.get('./assets/mocks/mock-get-analytic-results.json');
  }
}
