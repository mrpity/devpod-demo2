import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { State, adapterNotification } from './notification.state';
import * as fromNotification from './notification.reducers';

export const selectNotificationState =
  createFeatureSelector<State>('notification');

const selectNotifications = createSelector(
  selectNotificationState,
  fromNotification.selectNotifications
);

const {
  selectAll: selectNotificationAll,
} = adapterNotification.getSelectors(selectNotifications);

export const getNotificationsTotal = createSelector(
  selectNotificationState,
  fromNotification.selectNotificationsTotal
);

export const getNotificationsUnread = createSelector(
  selectNotificationState,
  fromNotification.selectNotificationsUnread
);

export const getNotificationsUnreadByType = createSelector(
  getNotificationsUnread,
  (notifications, props: any) => {
    return notifications[props.type];
  }
);

export const getNotificationsPage = createSelector(
  selectNotificationState,
  fromNotification.selectNotificationsPage
);

export const getNotifications = createSelector(
  selectNotificationAll,
  (items) => items
);

export const getIsLoading = createSelector(
  selectNotificationState,
  fromNotification.selectIsLoading
);
