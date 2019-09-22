import { Action } from '@ngrx/store';
import { SseErrorModel, SseResponseModel } from '@app/shared/models/sse-model';

export enum ActionTypes {
  SSE_SUCCESS = '[SSE] Success',
  SSE_FAILURE = '[SSE] Failure',
  SSE_KEEP_ALIVE = '[SSE] Keep Alive',
}


export class EventSourceSuccess implements Action {
  readonly type = ActionTypes.SSE_SUCCESS;
  constructor(public payload: SseResponseModel) {}
}

export class EventSourceFailure implements Action {
  readonly type = ActionTypes.SSE_FAILURE;
  constructor(public payload: SseErrorModel) {}
}

export class EventSourceKeepAlive implements Action {
  readonly type = ActionTypes.SSE_KEEP_ALIVE;
  constructor(public payload: any) {}
}

export type Actions =
  EventSourceSuccess | EventSourceFailure | EventSourceKeepAlive;
