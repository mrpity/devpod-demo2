import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NotificationStoreState, NotificationStoreSelectors, NotificationStoreActions } from '../store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { NOTIFICATION_TYPES } from '../notification.enums';
import { renderUnreadNotificationsCount } from '../services/notification.helpers';

@Component({
  selector: 'app-notification-open',
  templateUrl: './notification-open.component.html',
  styleUrls: ['./notification-open.component.scss']
})
export class NotificationOpenComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject();

  @Output() openNotifications = new EventEmitter();
  // notificationsUnread = 0;

  unreadCount$: Observable<any> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getNotificationsUnreadByType,
      { type: NOTIFICATION_TYPES.ALL }
    )
  );

  constructor(
    private store$: Store<NotificationStoreState.State>,
  ) { }

  ngOnInit() {
    this.store$.dispatch(
      new NotificationStoreActions.NotificationListActions.LoadAllUnreadCountRequest()
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  showNotifications() {
    this.openNotifications.emit();
  }

  getUnreadNotifications(value) {
    return renderUnreadNotificationsCount(value);
  }

}
