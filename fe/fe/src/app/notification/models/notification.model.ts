import { SseConstants } from '@app/shared/shared.enums';
import { NOTIFICATION_TYPES } from '../notification.enums';

export interface Notification {
  id: number;
  data: any;
  unread: boolean;
  type: SseConstants;
  time: string;
  userEmail?: string;
  error?: string | boolean;
  message?: string;
}

export interface NotificationCounts {
  [NOTIFICATION_TYPES.ALL]: number;
  [NOTIFICATION_TYPES.AVATAR]: number;
  [NOTIFICATION_TYPES.DATA_SOURCE]: number;
  [NOTIFICATION_TYPES.SEARCH]: number;
}
