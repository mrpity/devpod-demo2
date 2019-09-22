import { Action } from '@ngrx/store';
import { SseResponseAvatarDataModel } from '@app/shared/models/sse-model';

export enum ActionTypes {
  IMPORT_START_REQUEST = '[Avatar][Import] Start Request',
  IMPORT_START_SUCCESS = '[Avatar][Import] Start Success',
  IMPORT_START_FAILURE = '[Avatar][Import] Start Failure',
  IMPORT_COMPLETE_SUCCESS = '[Avatar][Import] Complete Success',
  IMPORT_COMPLETE_FAILURE = '[Avatar][Import] Complete Failure',
  LOAD_IMPORT_DIFF_REQUEST = '[Avatar][Import] Load Diff Request',
  LOAD_IMPORT_DIFF_SUCCESS = '[Avatar][Import] Load Diff Success',
  LOAD_IMPORT_DIFF_FAILURE = '[Avatar][Import] Load Diff Failure',
  CONFIRM_IMPORT_DIFF_REQUEST = '[Avatar][Import] Confirm Diff Request',
  CONFIRM_IMPORT_DIFF_SUCCESS = '[Avatar][Import] Confirm Diff Success',
  CONFIRM_IMPORT_DIFF_FAILURE = '[Avatar][Import] Confirm Diff Failure',
  CANCEL_IMPORT_DIFF_REQUEST = '[Avatar][Import] Cancel Diff Request',
  CANCEL_IMPORT_DIFF_SUCCESS = '[Avatar][Import] Cancel Diff Success',
  CANCEL_IMPORT_DIFF_FAILURE = '[Avatar][Import] Cancel Diff Failure',
  LOAD_ACTIVITY_LOG_REQUEST = '[Avatar][Import] Load Import Activity Log Request',
  LOAD_ACTIVITY_LOG_FAILURE = '[Avatar][Import] Load Import Activity Log Failure',
  LOAD_ACTIVITY_LOG_SUCCESS = '[Avatar][Import] Load Import Activity Log Success'
}

export class ImportStartRequest implements Action {
  readonly type = ActionTypes.IMPORT_START_REQUEST;
  constructor(public payload: {
    id: number,
    sn: string
  }) {}
}

export class ImportStartSuccess implements Action {
  readonly type = ActionTypes.IMPORT_START_SUCCESS;
  constructor(public payload: any) {}
}

export class ImportStartFailure implements Action {
  readonly type = ActionTypes.IMPORT_START_FAILURE;
  constructor(public payload: any) {}
}

export class ImportCompleteSuccess implements Action {
  readonly type = ActionTypes.IMPORT_COMPLETE_SUCCESS;
  constructor(public payload: SseResponseAvatarDataModel) {}
}

export class ImportCompleteFailure implements Action {
  readonly type = ActionTypes.IMPORT_COMPLETE_FAILURE;
  constructor(public payload: SseResponseAvatarDataModel) {}
}

export class LoadImportDiffRequest implements Action {
  readonly type = ActionTypes.LOAD_IMPORT_DIFF_REQUEST;
  constructor(public payload: {
    id: number
  }) {}
}

export class LoadImportDiffSuccess implements Action {
  readonly type = ActionTypes.LOAD_IMPORT_DIFF_SUCCESS;
  constructor(public payload: {
    id: number,
    diff: any
  }) {}
}

export class LoadImportDiffFailure implements Action {
  readonly type = ActionTypes.LOAD_IMPORT_DIFF_FAILURE;
  constructor(public payload: {
    id: number
  }) {}
}

export class ConfirmImportDiffRequest implements Action {
  readonly type = ActionTypes.CONFIRM_IMPORT_DIFF_REQUEST;
  constructor(public payload: {
    id: number,
    fields: string[]
  }) {}
}

export class ConfirmImportDiffSuccess implements Action {
  readonly type = ActionTypes.CONFIRM_IMPORT_DIFF_SUCCESS;
  constructor(public payload: {
    id: number
  }) {}
}

export class ConfirmImportDiffFailure implements Action {
  readonly type = ActionTypes.CONFIRM_IMPORT_DIFF_FAILURE;
  constructor(public payload: {
    id: number
  }) {}
}

export class CancelImportDiffRequest implements Action {
  readonly type = ActionTypes.CANCEL_IMPORT_DIFF_REQUEST;
  constructor(public payload: {
    id: number
  }) {}
}

export class CancelImportDiffSuccess implements Action {
  readonly type = ActionTypes.CANCEL_IMPORT_DIFF_SUCCESS;
  constructor() {}
}

export class CancelImportDiffFailure implements Action {
  readonly type = ActionTypes.CANCEL_IMPORT_DIFF_FAILURE;
  constructor() {}
}

export class LoadImportActivityLogRequest implements Action {
  readonly type = ActionTypes.LOAD_ACTIVITY_LOG_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadImportActivityLogFailure implements Action {
  readonly type = ActionTypes.LOAD_ACTIVITY_LOG_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadImportActivityLogSuccess implements Action {
  readonly type = ActionTypes.LOAD_ACTIVITY_LOG_SUCCESS;
  constructor(public payload: any[]) {}
}

export type Actions =
  ImportStartRequest | ImportStartSuccess | ImportStartFailure |
  ImportCompleteSuccess | ImportCompleteFailure |
  LoadImportDiffRequest | LoadImportDiffSuccess | LoadImportDiffFailure |
  CancelImportDiffRequest | CancelImportDiffSuccess | CancelImportDiffFailure |
  ConfirmImportDiffRequest | ConfirmImportDiffSuccess | ConfirmImportDiffFailure |
  LoadImportActivityLogRequest | LoadImportActivityLogFailure | LoadImportActivityLogSuccess;
