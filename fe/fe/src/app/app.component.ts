import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from './store';
import { SseActions } from './store/actions';
import { EventSourcePolyfill } from 'ng-event-source';

// TODO: REMOVE MOCK DATA!
const mockSSEresponse = JSON.stringify({
  type: 'CONNECTION_COMPLETE',
  data: {
    // requestId: 154,
    // status: 'SEARCHING',
    // countToProcess: 13,
    avatarId: 650,
    avatarFullName: 'Иван Козак 5',
    error: 'CREDENTIALS',
    snType: 'GOOGLE',
    state: 'LINKED'
  },
  userId: 'test@gmail.com'
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  protected _eventSource: EventSourcePolyfill;

  constructor(
    translate: TranslateService,
    private authService: AuthService,
    private store$: Store<RootStoreState.State>
  ) {
    translate.setDefaultLang('en');
    translate.use('ru');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;

    this.isLoggedIn$.subscribe(
      (isLogin) => {
        if (isLogin) {
          this._eventSource = new EventSourcePolyfill(
            '/api/notifications',
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              heartbeatTimeout: 60000 // Canceled timeout
            },
          );
          this._eventSource.onmessage = (data) => this.__onSseSuccess({ ...data });
          this._eventSource.onerror = (data) => this.__onSseFailure(data);
        } else if (!isLogin && this._eventSource) {
          this._eventSource.close();
        }
      });
  }

  /** @internal */
  protected __onSseSuccess(sse) {
    // Dispatch SSE success messages
    this.store$.dispatch(
      new SseActions.EventSourceSuccess(
        JSON.parse(sse.data)
        // JSON.parse(mockSSEresponse)
      )
    );
  }

  /** @internal */
  protected __onSseFailure(sse) {
    // Dispatch SSE failure messages
    console.log('SSE Failure ', sse);
    this.store$.dispatch(
      new SseActions.EventSourceFailure(sse)
    );
  }
}
