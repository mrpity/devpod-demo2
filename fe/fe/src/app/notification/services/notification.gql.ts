import gql from 'graphql-tag';
import { NOTIFICATION_TYPES, NOTIFICATION_REQUEST_PREFIXES } from '../notification.enums';

const fragmentNotification = gql`
  fragment Notification on Notification {
    data
    id
    time
    type
    unread
  }
`;

const fragmentNotificationList = gql`
  fragment NotificationListPage on NotificationListPage {
    totalItemsCount
    items {
      ...Notification
    }
  }
  ${fragmentNotification}
`;

const fragmentCountNotification = gql`
  fragment NotificationCountResponse on NotificationCountResponse {
    count
  }
`;

export const gueryGetAllNotificationsUnread = gql`
  query ($typePrefix: String!) {
    ${NOTIFICATION_TYPES.ALL}: countUnreadNotifications(typePrefix: $typePrefix) {
      ...NotificationCountResponse
    }
  }
  ${fragmentCountNotification}
`;

export const gueryGetNotificationListPage = (typePrefix) => gql`
  query ($input: NotificationListQueryInput!, $typePrefix: String!) {
    notifications: getNotificationsList(input: $input) {
      ...NotificationListPage
    }
    ${typePrefix}: countUnreadNotifications(typePrefix: $typePrefix) {
      ...NotificationCountResponse
    }
  }
  ${fragmentNotificationList}
  ${fragmentCountNotification}
`;

export const queryInitNotificationList = () => gql`
  query ($input: NotificationListQueryInput!) {
    notifications: getNotificationsList(input: $input) {
      ...NotificationListPage
    }
    ${NOTIFICATION_TYPES.ALL}: countUnreadNotifications(typePrefix: "") {
      ...NotificationCountResponse
    }
    ${NOTIFICATION_TYPES.AVATAR}: countUnreadNotifications(typePrefix: "${NOTIFICATION_REQUEST_PREFIXES.AVATAR}") {
      ...NotificationCountResponse
    }
    ${NOTIFICATION_TYPES.DATA_SOURCE}: countUnreadNotifications(typePrefix: "${NOTIFICATION_REQUEST_PREFIXES.DATA_SOURCE}") {
      ...NotificationCountResponse
    }
    ${NOTIFICATION_TYPES.SEARCH}: countUnreadNotifications(typePrefix: "${NOTIFICATION_REQUEST_PREFIXES.SEARCH}") {
      ...NotificationCountResponse
    }
  }
  ${fragmentNotificationList}
  ${fragmentCountNotification}
`;
