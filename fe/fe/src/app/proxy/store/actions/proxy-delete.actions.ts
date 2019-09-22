import { Action } from '@ngrx/store';

export enum ActionTypes {
  DELETE_REQUEST = '[Proxy][DELETE] Delete Proxy Request',
  DELETE_FAILURE = '[Proxy][DELETE] Delete Proxy Failure',
  DELETE_SUCCESS = '[Proxy][DELETE] Delete Proxy Success',
  OPEN_DELETE_DIALOG = '[Proxy][DELETE] Open Dialog',
  CLOSE_DELETE_DIALOG = '[Proxy][DELETE] Close Dialog',
  DELETE_PROXIES = '[Proxy][DELETE] Delete proxy list'
}

export class DeleteRequest implements Action {
  readonly type = ActionTypes.DELETE_REQUEST;
  constructor(public payload: number[]) {}
}

export class DeleteFailure implements Action {
  readonly type = ActionTypes.DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: number[]) {}
}

export class OpenDeleteDialog implements Action {
  readonly type = ActionTypes.OPEN_DELETE_DIALOG;
  constructor(public payload: object) {}
}

export class CloseDeleteDialog implements Action {
  readonly type = ActionTypes.CLOSE_DELETE_DIALOG;
  constructor() {}
}

export class DeleteProxies implements Action {
  readonly type = ActionTypes.DELETE_PROXIES;
  constructor(public payload: number[]) {}
}


export type Actions =
  DeleteRequest
  | DeleteFailure
  | DeleteSuccess
  | DeleteProxies
  | OpenDeleteDialog
  | CloseDeleteDialog;
