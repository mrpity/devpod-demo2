import { Action } from '@ngrx/store';
import {Proxy, ProxyDetailsModel} from '../../models/proxy.interface';

export enum ActionTypes {
  LOAD_DETAILS_REQUEST = '[Proxy][Details] Load Request',
  LOAD_DETAILS_FAILURE = '[Proxy][Details] Load Failure',
  LOAD_DETAILS_SUCCESS = '[Proxy][Details] Load Success',
  CLEAR_PROXY_DETAILS = '[Proxy][Details] Clear Proxy Data',
  OPEN_DETAILS_DIALOG = '[Proxy][Details] Open Details Proxy Dialog',
  CLOSE_DETAILS_DIALOG = '[Proxy][Details] Close Details Proxy Dialog',
  UPDATE_REQUEST = '[Proxy][Edit] Update Proxy Request',
  UPDATE_FAILURE = '[Proxy][Edit] Update Proxy Failure',
  UPDATE_SUCCESS = '[Proxy][Edit] Update Proxy Success',
}

export class OpenDetailsDialog implements Action {
  readonly type = ActionTypes.OPEN_DETAILS_DIALOG;
  constructor(public payload: object) {}
}

export class CloseDetailsDialog implements Action {
  readonly type = ActionTypes.CLOSE_DETAILS_DIALOG;
  constructor() {}
}

export class LoadDetailsRequest implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadDetailsFailure implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadDetailsSuccess implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_SUCCESS;
  constructor(public payload: ProxyDetailsModel) {}
}

export class ClearProxyData implements Action {
  readonly type = ActionTypes.CLEAR_PROXY_DETAILS;
  constructor() {}
}

export class UpdateRequest implements Action {
  readonly type = ActionTypes.UPDATE_REQUEST;
  constructor(public payload: object) {}
}

export class UpdateFailure implements Action {
  readonly type = ActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { id: number }) {}
}

export type Actions = LoadDetailsRequest
  | LoadDetailsFailure
  | LoadDetailsSuccess
  | ClearProxyData
  | OpenDetailsDialog
  | CloseDetailsDialog
  | UpdateRequest
  | UpdateFailure
  | UpdateSuccess;
