import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { filter, map } from 'rxjs/operators';
import { NOTIFICATION_TYPES, NOTIFICATION_REQUEST_PREFIXES } from '../notification.enums';
import { SseConstants } from '@app/shared/shared.enums';
import {
  gueryGetNotificationListPage,
  queryInitNotificationList,
  gueryGetAllNotificationsUnread
} from './notification.gql';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  pageSize = 20;

  constructor(
    private apollo: Apollo
  ) { }

  getNotificationListPage(filters: any) {
    // Convert sortBy to sorting for request
    const input = {
      pageSize: this.pageSize,
      pageNumber: filters.pageNumber,
      typePrefix: NOTIFICATION_REQUEST_PREFIXES[filters.typePrefix]
    };

    return this.apollo.watchQuery<any>({
      query: gueryGetNotificationListPage(filters.typePrefix),
      variables: {
        input,
        typePrefix: input.typePrefix
      }
    })
      .valueChanges
      .pipe(
        map((result): any => {
          return {
            notifications: result.data.notifications,
            unreadCount: {
              [filters.typePrefix]: result.data[filters.typePrefix].count
            }
          };
        })
      );
  }

  initNotificationList(filters: any) {
    // Convert sortBy to sorting for request
    const input = {
      pageSize: this.pageSize,
      pageNumber: filters.pageNumber,
      typePrefix: NOTIFICATION_REQUEST_PREFIXES[filters.typePrefix]
    };

    return this.apollo.watchQuery<any>({
      query: queryInitNotificationList(),
      variables: {
        input
      }
    })
      .valueChanges
      .pipe(
        map((result): any => {
          return {
            notifications: result.data.notifications,
            unreadCount: {
              [NOTIFICATION_TYPES.ALL]: result.data[NOTIFICATION_TYPES.ALL].count,
              [NOTIFICATION_TYPES.AVATAR]: result.data[NOTIFICATION_TYPES.AVATAR].count,
              [NOTIFICATION_TYPES.DATA_SOURCE]: result.data[NOTIFICATION_TYPES.DATA_SOURCE].count,
              [NOTIFICATION_TYPES.SEARCH]: result.data[NOTIFICATION_TYPES.SEARCH].count
            }
          };
        })
      );
  }

  getUnreadNotificationsCount() {
    return this.apollo.watchQuery<any>({
      query: gueryGetAllNotificationsUnread,
      variables: {
        typePrefix: NOTIFICATION_REQUEST_PREFIXES[NOTIFICATION_TYPES.ALL]
      }
    })
      .valueChanges
      .pipe(
        map((result): any => {
          return {
            unreadCount: {
              [NOTIFICATION_TYPES.ALL]: result.data[NOTIFICATION_TYPES.ALL].count,
            }
          };
        })
      );
  }

  getNotificationType(notification) {
    switch (notification.type) {
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
  }
}
