import { Action } from '@ngrx/store';
import {DataSourceCreate} from '@app/data-source/models/data-source-crud.model';

export enum ActionTypes {
  CREATE_NEW_REQUEST = '[Data Source][Create] New Data Source Request',
  CREATE_NEW_FAILURE = '[Data Source][Create] New Data Source Failure',
  CREATE_NEW_SUCCESS = '[Data Source][Create] New Data Source Success',
  CREATE_IN_BATCH_REQUEST = '[Data Source][Import] Add Several Data Sources In Batch Request',
  CREATE_IN_BATCH_FAILURE = '[Data Source][Import] Add Several Data Sources In Batch Failure',
  CREATE_IN_BATCH_SUCCESS = '[Data Source][Import] Add Several Data Sources In Batch Success',
  UPDATE_REQUEST = '[Data Source][Edit] Update Data Source Request',
  UPDATE_FAILURE = '[Data Source][Edit] Update Data Source Failure',
  UPDATE_SUCCESS = '[Data Source][Edit] Update Data Source Success',
  CHANGE_STATE_REQUEST = '[Data Source][General] Change Data Source State Request',
  CHANGE_STATE_FAILURE = '[Data Source][General] Change Data Source State Failure',
  CHANGE_STATE_SUCCESS = '[Data Source][General] Change Data Source State Success',
}

export class CreateRequest implements Action {
  readonly type = ActionTypes.CREATE_NEW_REQUEST;
  constructor(public payload: DataSourceCreate) {}
}

export class CreateFailure implements Action {
  readonly type = ActionTypes.CREATE_NEW_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CREATE_NEW_SUCCESS;
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
  constructor(public payload: number) {}
}

export class CreateInBatchRequest implements Action {
  readonly type = ActionTypes.CREATE_IN_BATCH_REQUEST;
  constructor(public payload: object) {}
}

export class CreateInBatchFailure implements Action {
  readonly type = ActionTypes.CREATE_IN_BATCH_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateInBatchSuccess implements Action {
  readonly type = ActionTypes.CREATE_IN_BATCH_SUCCESS;
  constructor() {}
}

export class ChangeStateRequest implements Action {
  readonly type = ActionTypes.CHANGE_STATE_REQUEST;
  constructor(public payload: { enabled: boolean, id: number }) {}
}

export class ChangeStateFailure implements Action {
  readonly type = ActionTypes.CHANGE_STATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ChangeStateSuccess implements Action {
  readonly type = ActionTypes.CHANGE_STATE_SUCCESS;
  constructor() {}
}

export type Actions =
  CreateRequest
  | CreateFailure
  | CreateSuccess
  | CreateInBatchRequest
  | CreateInBatchFailure
  | CreateInBatchSuccess
  | UpdateRequest
  | UpdateFailure
  | UpdateSuccess
  | ChangeStateRequest
  | ChangeStateFailure
  | ChangeStateSuccess;
