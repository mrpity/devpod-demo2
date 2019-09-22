import { MAX_UNREAD } from '../notification.enums';

export const renderUnreadNotificationsCount = (value) => {
  return value > MAX_UNREAD
    ? MAX_UNREAD + '+'
    : value;
};
