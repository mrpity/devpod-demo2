import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOAD_REQUEST = '[Notification][List] Load Data Request',
  LOAD_FAILURE = '[Notification][List] Load Data Failure',
  LOAD_SUCCESS = '[Notification][List] Load Data Success',
  INIT_REQUEST = '[Notification][List] Init Data Request',
  INIT_FAILURE = '[Notification][List] Init Data Failure',
  INIT_SUCCESS = '[Notification][List] Init Data Success',
  LOAD_ALL_UNREAD_COUNT_REQUEST = '[Notification][Open] Load All Unread Count Request',
  LOAD_ALL_UNREAD_COUNT_FAILURE = '[Notification][Open] Load All Unread Count Failure',
  LOAD_ALL_UNREAD_COUNT_SUCCESS = '[Notification][Open] Load All Unread Count Success',
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: string
  }) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: any) { }
}

export class InitRequest implements Action {
  readonly type = ActionTypes.INIT_REQUEST;
  constructor() { }
}

export class InitFailure implements Action {
  readonly type = ActionTypes.INIT_FAILURE;
  constructor(public payload: {
    error: string
  }) { }
}

export class InitSuccess implements Action {
  readonly type = ActionTypes.INIT_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadAllUnreadCountRequest implements Action {
  readonly type = ActionTypes.LOAD_ALL_UNREAD_COUNT_REQUEST;
  constructor() { }
}

export class LoadAllUnreadCountFailure implements Action {
  readonly type = ActionTypes.LOAD_ALL_UNREAD_COUNT_FAILURE;
  constructor(public payload: {
    error: string
  }) { }
}

export class LoadAllUnreadCountSuccess implements Action {
  readonly type = ActionTypes.LOAD_ALL_UNREAD_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export type Actions =
  LoadRequest |
  LoadFailure |
  LoadSuccess |
  InitRequest |
  InitFailure |
  InitSuccess |
  LoadAllUnreadCountRequest |
  LoadAllUnreadCountFailure |
  LoadAllUnreadCountSuccess;
