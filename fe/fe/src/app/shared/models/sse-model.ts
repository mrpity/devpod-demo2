import { SseConstants } from '../shared.enums';
import { EventSourcePolyfill } from 'ng-event-source';

export interface SseResponseAvatarDataModel {
  avatarId: number;
  avatarFirstName: string;
  avatarLastName: string;
  snType?: string;
  error?: string;
}

export interface SseResponseModel {
  userId: string;
  type: SseConstants;
  data: SseResponseAvatarDataModel;
}

export interface SseErrorModel {
  errorCode: number;
  errorMessage: string;
  type: string;
  target: EventSourcePolyfill;
}
