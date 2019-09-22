import { NOTIFICATION_TYPES } from '../notification.enums';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Notification, NotificationCounts } from '../models/notification.model';

export interface NotificationEntityState extends EntityState<Notification> { }

export interface State {
  notifications: NotificationEntityState;
  isLoading: boolean;
  notificationsTotal: NotificationCounts;
  notificationsPage: NotificationCounts;
  notificationsUnread: NotificationCounts;
}

export const adapterNotification = createEntityAdapter<Notification>({});

export const initialState: State = {
  notifications: adapterNotification.getInitialState(),
  isLoading: false,
  notificationsTotal: {
    [NOTIFICATION_TYPES.ALL]: null,
    [NOTIFICATION_TYPES.AVATAR]: null,
    [NOTIFICATION_TYPES.DATA_SOURCE]: null,
    [NOTIFICATION_TYPES.SEARCH]: null
  },
  notificationsPage: {
    [NOTIFICATION_TYPES.ALL]: null,
    [NOTIFICATION_TYPES.AVATAR]: null,
    [NOTIFICATION_TYPES.DATA_SOURCE]: null,
    [NOTIFICATION_TYPES.SEARCH]: null
  },
  notificationsUnread: {
    [NOTIFICATION_TYPES.ALL]: null,
    [NOTIFICATION_TYPES.AVATAR]: null,
    [NOTIFICATION_TYPES.DATA_SOURCE]: null,
    [NOTIFICATION_TYPES.SEARCH]: null
  },
};
