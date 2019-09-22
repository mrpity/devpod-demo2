import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum ActionTypes {
  CREATE_NEW_REQUEST = '[User Management][Create] New User Request',
  CREATE_NEW_FAILURE = '[User Management][Create] New User Failure',
  CREATE_NEW_SUCCESS = '[User Management][Create] New User Success',
  CREATE_FORM_INVALID = '[User Management][Create/Edit] Form Invalid',
  UPDATE_REQUEST = '[User Management][Edit] Update User Request',
  UPDATE_FAILURE = '[User Management][Edit] Update User Failure',
  UPDATE_SUCCESS = '[User Management][Edit] Update User Success',
  LOAD_DETAILS_REQUEST = '[User Management][Details] Load User Details Request',
  LOAD_DETAILS_FAILURE = '[User Management][Details] Load User Details Failure',
  LOAD_DETAILS_SUCCESS = '[User Management][Details] Load User Details Success',
  CLEAR_SELECTED_USER = '[User Management][Details] Clear User State',
}

export class CreateRequest implements Action {
  readonly type = ActionTypes.CREATE_NEW_REQUEST;
  constructor(public payload: User) {}
}

export class CreateFailure implements Action {
  readonly type = ActionTypes.CREATE_NEW_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CREATE_NEW_SUCCESS;
  constructor() {}
}

export class UpdateRequest implements Action {
  readonly type = ActionTypes.UPDATE_REQUEST;
  constructor(public payload: User) {}
}

export class UpdateFailure implements Action {
  readonly type = ActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: number) {}
}

export class FormInvalid implements Action {
  readonly type = ActionTypes.CREATE_FORM_INVALID;
  constructor(public payload: any) {}
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
  constructor(public payload: User) {}
}

export class ClearSelectedUser implements Action {
  readonly type = ActionTypes.CLEAR_SELECTED_USER;
  constructor() {}
}

export type Actions =
  CreateRequest
  | CreateFailure
  | CreateSuccess
  | FormInvalid
  | UpdateRequest
  | UpdateFailure
  | UpdateSuccess
  | LoadDetailsRequest
  | LoadDetailsFailure
  | LoadDetailsSuccess
  | ClearSelectedUser;
