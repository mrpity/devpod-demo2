import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { initialState, State, adapterNotification, NotificationEntityState } from './notification.state';
import { NotificationListActions } from './actions';
import { InjectionToken } from '@angular/core';
import { NOTIFICATION_TYPES } from '../notification.enums';
import { SseConstants } from '@app/shared/shared.enums';
import { NotificationCounts } from '../models/notification.model';

const getNotificationType = (type) => {
  switch (type) {
    case SseConstants.SSE_AVATAR_IMPORT_SUCCESS:
    case SseConstants.SSE_AVATAR_EXPORT_SUCCESS:
    case SseConstants.SSE_AVATAR_IMPORT_FAILED:
    case SseConstants.SSE_AVATAR_EXPORT_FAILED:
    case SseConstants.SSE_AVATAR_LINKING_FAILED:
    case SseConstants.SSE_AVATAR_LINKING_SUCCESSES:
      return NOTIFICATION_TYPES.AVATAR;
    case SseConstants.SSE_DATASOURCE_UPDATED:
      return NOTIFICATION_TYPES.DATA_SOURCE;
    case SseConstants.EXTERNAL_SEARCH_COMPLETED:
      return NOTIFICATION_TYPES.SEARCH;
  }
};

// export function notifications(
//   state = initialState.notifications,
//   action: NotificationListActions.Actions
// ): any[] {
//   switch (action.type) {
//     case NotificationListActions.ActionTypes.LOAD_SUCCESS: {
//       return [
//         ...state,
//         ...action.payload.notifications
//       ];
//     }
//     case NotificationListActions.ActionTypes.LOAD_FAILURE: {
//       return state;
//     }
//     default: {
//       return state;
//     }
//   }
// }

export function notifications(
  state = initialState.notifications,
  action: NotificationListActions.Actions
): NotificationEntityState {
  switch (action.type) {
    case NotificationListActions.ActionTypes.LOAD_FAILURE:
    case NotificationListActions.ActionTypes.INIT_FAILURE: {
      return state;
    }
    case NotificationListActions.ActionTypes.LOAD_SUCCESS:
    case NotificationListActions.ActionTypes.INIT_SUCCESS: {
      // return action.payload.items;
      return adapterNotification.upsertMany(action.payload.notifications, state);
    }
    default: {
      return state;
    }
  }
}

export function notificationsPage(
  state = initialState.notificationsPage,
  action: NotificationListActions.Actions
): NotificationCounts {
  switch (action.type) {
    case NotificationListActions.ActionTypes.LOAD_SUCCESS:
    case NotificationListActions.ActionTypes.INIT_SUCCESS: {
      const { typePrefix, pageNumber } = action.payload;
      return {
        ...state,
        [typePrefix]: pageNumber
      };
    }
    case NotificationListActions.ActionTypes.LOAD_REQUEST:
    case NotificationListActions.ActionTypes.LOAD_FAILURE:
    case NotificationListActions.ActionTypes.INIT_REQUEST:
    case NotificationListActions.ActionTypes.INIT_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function notificationsTotal(
  state = initialState.notificationsTotal,
  action: NotificationListActions.Actions
): NotificationCounts {
  switch (action.type) {
    case NotificationListActions.ActionTypes.LOAD_SUCCESS:
    case NotificationListActions.ActionTypes.INIT_SUCCESS: {
      const { totalItemsCount, typePrefix } = action.payload;
      return {
        ...state,
        [typePrefix]: totalItemsCount
      };
    }
    case NotificationListActions.ActionTypes.LOAD_REQUEST:
    case NotificationListActions.ActionTypes.LOAD_FAILURE:
    case NotificationListActions.ActionTypes.INIT_REQUEST:
    case NotificationListActions.ActionTypes.INIT_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function notificationsUnread(
  state = initialState.notificationsTotal,
  action: NotificationListActions.Actions
): NotificationCounts {
  switch (action.type) {
    case NotificationListActions.ActionTypes.LOAD_SUCCESS: {
      const { unreadCount } = action.payload;
      return {
        ...state,
        ...unreadCount
      };
    }
    case NotificationListActions.ActionTypes.INIT_SUCCESS:
    case NotificationListActions.ActionTypes.LOAD_ALL_UNREAD_COUNT_SUCCESS: {
      return action.payload.unreadCount;
    }
    case NotificationListActions.ActionTypes.LOAD_REQUEST:
    case NotificationListActions.ActionTypes.LOAD_FAILURE:
    case NotificationListActions.ActionTypes.INIT_REQUEST:
    case NotificationListActions.ActionTypes.INIT_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: NotificationListActions.Actions
): boolean {
  switch (action.type) {
    case NotificationListActions.ActionTypes.LOAD_REQUEST:
    case NotificationListActions.ActionTypes.INIT_REQUEST: {
      return true;
    }
    case NotificationListActions.ActionTypes.LOAD_FAILURE:
    case NotificationListActions.ActionTypes.LOAD_SUCCESS:
    case NotificationListActions.ActionTypes.INIT_FAILURE:
    case NotificationListActions.ActionTypes.INIT_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({
  notifications,
  notificationsTotal,
  notificationsUnread,
  notificationsPage,
  isLoading
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('NotificationReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const selectNotifications = (state: State): NotificationEntityState => state.notifications;
export const selectIsLoading = (state: State): boolean => state.isLoading;
export const selectNotificationsTotal = (state: State): NotificationCounts => state.notificationsTotal;
export const selectNotificationsPage = (state: State): NotificationCounts => state.notificationsPage;
export const selectNotificationsUnread = (state: State): NotificationCounts => state.notificationsUnread;
