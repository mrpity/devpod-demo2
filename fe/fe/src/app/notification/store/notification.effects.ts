import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import * as actions from '@app/notification/store/actions';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import * as NotificationStoreState from '../store/notification.state';
import * as NotificationStoreSelectors from '../store/notification.selectors';
import { NOTIFICATION_TYPES } from '../notification.enums';

@Injectable()
export class NotificationStoreEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<NotificationStoreState.State>,
    private dataService: NotificationService
  ) {}

  @Effect()
  initDataSourceList$: Observable<Action> = this.actions$.pipe(
    ofType(
      actions.NotificationListActions.ActionTypes.INIT_REQUEST
    ),
    withLatestFrom(this.store$.pipe(
      select(NotificationStoreSelectors.getNotificationsPage)
    )),
    switchMap(([action, currentPage]: any) => {
      return this.dataService.initNotificationList({
        typePrefix: NOTIFICATION_TYPES.ALL,
        pageNumber: 0
      }).pipe(
        map((data: any) => new actions.NotificationListActions.InitSuccess({
          notifications: data.notifications.items,
          totalItemsCount: data.notifications.totalItemsCount,
          unreadCount: data.unreadCount,
          typePrefix: NOTIFICATION_TYPES.ALL,
          pageNumber: 0
        })),
        catchError(error => {
          return observableOf(new actions.NotificationListActions.InitFailure({ error }));
        }
        )
      );
    })
  );

  @Effect()
  loadDataSourceList$: Observable<Action> = this.actions$.pipe(
    ofType(
      actions.NotificationListActions.ActionTypes.LOAD_REQUEST
    ),
    withLatestFrom(this.store$.pipe(
      select(NotificationStoreSelectors.getNotificationsPage)
    )),
    switchMap(([action, currentPage]: any) => {
      const { typePrefix } = action.payload;
      const pageNumber = currentPage[typePrefix] === null ? 0 : currentPage[typePrefix] + 1;
      return this.dataService.getNotificationListPage({
        typePrefix,
        pageNumber
      }).pipe(
        map((data: any) => new actions.NotificationListActions.LoadSuccess({
          notifications: data.notifications.items,
          totalItemsCount: data.notifications.totalItemsCount,
          unreadCount: data.unreadCount,
          typePrefix,
          pageNumber
        })),
        catchError(error => {
          return observableOf(new actions.NotificationListActions.LoadFailure({ error }));
        }
        )
      );
    })
  );

  @Effect()
  loadUnreadCount$: Observable<Action> = this.actions$.pipe(
    ofType(
      actions.NotificationListActions.ActionTypes.LOAD_ALL_UNREAD_COUNT_REQUEST
    ),
    switchMap((action: any) => {
      return this.dataService.getUnreadNotificationsCount().pipe(
        map((data: any) => new actions.NotificationListActions.LoadAllUnreadCountSuccess({
          unreadCount: data.unreadCount
        })),
        catchError(error => {
          return observableOf(new actions.NotificationListActions.LoadAllUnreadCountFailure({ error }));
        }
        )
      );
    })
  );
}
