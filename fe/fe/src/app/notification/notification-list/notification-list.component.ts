import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { NOTIFICATION_TYPES } from '../notification.enums';
import { SseConstants } from '@app/shared/shared.enums';
import { Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AvatarConnectionStatus } from '@app/avatar/avatar.enums';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { NotificationStoreState, NotificationStoreActions, NotificationStoreSelectors } from '../store';
import { Notification, NotificationCounts } from '../models/notification.model';
import { renderUnreadNotificationsCount } from '../services/notification.helpers';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() data: any;
  @Output() closeNotifications = new EventEmitter();

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('notificationListTag', { static: false }) notificationListTag: ElementRef;

  /**
   * Observables
   * - Getting ASYNC data from Store
   */
  private _unsubscribe$ = new Subject();

  notificationList$: Observable<Notification[]> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getNotifications
    )
  );

  notificationsPage$: Observable<any> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getNotificationsPage
    )
  );

  notificationsUnread$: Observable<any> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getNotificationsUnread
    )
  );

  notificationsTotal$: Observable<any> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getNotificationsTotal
    )
  );

  isLoading$: Observable<any> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(
      NotificationStoreSelectors.getIsLoading
    )
  );

  notifications: any[];
  notificationsPage: NotificationCounts;
  notificationsTotal: NotificationCounts;
  notificationsUnread: NotificationCounts;
  serialized: any = {
    notifications: {},
    dates: {},
    count: {}
  };
  currentTabIndex = 0;
  currentPrefix = NOTIFICATION_TYPES.ALL;

  /**
   * Mapping of SSE EVENTS
   */
  sseMessages = {
    [SseConstants.SSE_AVATAR_IMPORT_SUCCESS]: 'avatar.validation.links.successfulImport',
    [SseConstants.SSE_AVATAR_IMPORT_FAILED]: 'avatar.validation.links.failedImport',
    [SseConstants.SSE_AVATAR_EXPORT_SUCCESS]: 'avatar.validation.links.successfulExport',
    [SseConstants.SSE_AVATAR_EXPORT_FAILED]: 'avatar.validation.links.failedExport',
    [SseConstants.SSE_AVATAR_LINKING_FAILED]: {
      FACEBOOK: 'avatar.validation.links.facebook.failLink',
      GOOGLE: 'avatar.validation.links.google.failLink',
      ODNOKLASSNIKI: 'avatar.validation.links.odnoklassniki.failLink',
    },
    [SseConstants.SSE_AVATAR_LINKING_SUCCESSES]: {
      [AvatarConnectionStatus.LINKED]: {
        FACEBOOK: 'avatar.validation.links.facebook.successfulLink',
        GOOGLE: 'avatar.validation.links.google.successfulLink',
        ODNOKLASSNIKI: 'avatar.validation.links.odnoklassniki.successfulLink'
      },
      [AvatarConnectionStatus.NOT_LINKED]: {
        FACEBOOK: 'avatar.validation.links.facebook.unlink',
        GOOGLE: 'avatar.validation.links.google.unlink',
        ODNOKLASSNIKI: 'avatar.validation.links.odnoklassniki.unlink'
      }
    }
  };

  constructor(
    private router: Router,
    private store$: Store<NotificationStoreState.State>,
  ) { }

  get notificationTypes() {
    return NOTIFICATION_TYPES;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.notificationListTag.nativeElement.classList.add('opened');
    }, 0);
  }

  ngOnInit() {

    this.initSerializedData();

    this.notificationList$.subscribe(data => {
      if (data) {
        this.notifications = data;
        this.serializeNotifications(this.notifications);
      }
    });

    this.notificationsPage$.subscribe(data => { this.notificationsPage = data; });
    this.notificationsTotal$.subscribe(data => { this.notificationsTotal = data; });
    this.notificationsUnread$.subscribe(data => { this.notificationsUnread = data; });

    if (this.notificationsPage[NOTIFICATION_TYPES.ALL] === null) {
      this.store$.dispatch(
        new NotificationStoreActions.NotificationListActions.InitRequest()
      );
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  serializeNotifications(notifications) {
    this.initSerializedData();
    notifications.forEach((item, i) => {
      const notification = {
        ...item,
        date: moment(item.time).format('DD-MM-YYYY')
      };
      switch (notification.type) {
        case SseConstants.SSE_AVATAR_IMPORT_SUCCESS:
        case SseConstants.SSE_AVATAR_EXPORT_SUCCESS:
        case SseConstants.SSE_AVATAR_IMPORT_FAILED:
        case SseConstants.SSE_AVATAR_EXPORT_FAILED:
          notification.message = this.sseMessages[notification.type];
        case SseConstants.SSE_AVATAR_LINKING_FAILED:
          notification.message =
            notification.message || this.sseMessages[notification.type][notification.data.snType];
        case SseConstants.SSE_AVATAR_LINKING_SUCCESSES:
          notification.message =
            notification.message
            || this.sseMessages[notification.type][notification.data.state || AvatarConnectionStatus.LINKED][notification.data.snType];
          notification.goto = () => this.router.navigate(
            [`app/avatar/details/${notification.data.avatarId}/links`]
          ).then(() => this.close());
          notification.error = notification.data.error;
          this.setNotificationsByType(NOTIFICATION_TYPES.AVATAR, notification);
          break;

        case SseConstants.SSE_DATASOURCE_UPDATED:
          notification.goto = () => this.router.navigate(
            [`app/data-source/details/${notification.data.dataSourceId}/general`]
          ).then(() => this.close());
          notification.message = `dataSource.list.status.${notification.data.status.toLowerCase()}`;
          notification.error = notification.data.status === 'FAILED';
          this.setNotificationsByType(NOTIFICATION_TYPES.DATA_SOURCE, notification);
          break;

        case SseConstants.EXTERNAL_SEARCH_COMPLETED:
          notification.goto = () => this.router.navigate(
            [`app/search/${notification.data.requestId}/results`]
          ).then(() => this.close());
          notification.message = `search.sseRequestCompleted.${notification.data.status}`;
          notification.error = notification.data.status === 'FAILED';
          this.setNotificationsByType(NOTIFICATION_TYPES.SEARCH, notification);
          break;
      }
      this.setNotificationsByType(NOTIFICATION_TYPES.ALL, notification);
    });
  }

  setNotificationsByType(itemType, item) {
    if (Object.keys(this.serialized.notifications[itemType]).indexOf(item.date) === -1) {
      this.serialized.notifications[itemType][item.date] = [];
      this.serialized.dates[itemType].push(item.date);
    }
    this.serialized.notifications[itemType][item.date].push(item);
    this.serialized.count[itemType] += 1;
  }

  close() {
    this.notificationListTag.nativeElement.classList.remove('opened');
    this.closeNotifications.emit();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    switch (tabChangeEvent.index) {
      case 1:
        this.currentPrefix = NOTIFICATION_TYPES.AVATAR;
        break;
      case 2:
        this.currentPrefix = NOTIFICATION_TYPES.DATA_SOURCE;
        break;
      case 3:
        this.currentPrefix = NOTIFICATION_TYPES.SEARCH;
        break;
      default:
        this.currentPrefix = NOTIFICATION_TYPES.ALL;
    }
    if (this.notificationsPage[this.currentPrefix] === null) {
      this.store$.dispatch(
        new NotificationStoreActions.NotificationListActions.LoadRequest({
          typePrefix: this.currentPrefix
        })
      );
    }
  }

  loadMore() {
    this.store$.dispatch(
      new NotificationStoreActions.NotificationListActions.LoadRequest({
        typePrefix: this.currentPrefix
      })
    );
  }

  initSerializedData() {
    this.serialized = {
      notifications: Object.keys(NOTIFICATION_TYPES).reduce((res, item) => {
        res[item] = {};
        return res;
      }, {}),
      dates: Object.keys(NOTIFICATION_TYPES).reduce((res, item) => {
        res[item] = [];
        return res;
      }, {}),
      count: Object.keys(NOTIFICATION_TYPES).reduce((res, item) => {
        res[item] = 0;
        return res;
      }, {})
    };
  }

  getUnreadNotifications(type) {
    return renderUnreadNotificationsCount(
      this.notificationsUnread[this.notificationTypes[type]]
    );
  }

}
