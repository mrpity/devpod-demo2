import {Action} from '@ngrx/store';
import {
  ExternalCompletedOutput,
  GetRequestOutput,
  RequestsPagination,
  SearchRequestListQueryOutput
} from '@app/search/models/request.model';
import { SearchRequestInput } from '@app/search/models/result.model';

export enum ActionTypes {
  LOAD_REQUEST = '[Search][Requests][List] Load Requests Request',
  LOAD_FAILURE = '[Search][Requests][List] Load Requests Failure',
  LOAD_SUCCESS = '[Search][Requests][List] Load Requests Success',
  CHANGE_PAGINATION = '[Search][Requests] Change Pagination',
  CHANGE_SORTING = '[Search][Requests] Change Sorting',
  CLEAR_REQUESTS = '[Search][Requests] Clear Requests List',
  CLEAR_PAGINATION = '[Search][Requests] Clear pagination',
  REFRESH_REQUESTS = '[Search][Requests] Refresh Requests',
  SELECT_REQUEST = '[Search][Request] Select Request Item',
  SELECT_FAILURE = '[Search][Request] Select Request Item Failure',
  SELECT_SUCCESS = '[Search][Request] Select Request Item Success',
  EXTERNAL_ERROR = '[Search][External] External Search Error',
  SSE_EXTERNAL_COMPLETED = '[Search][External] SSE External Search Completed',
  EXTERNAL_REQUEST = '[Search][External] External Search Request',
  EXTERNAL_SUCCESS = '[Search][External] External Search Success',
  CANCEL_REQUEST = '[Search][Requests] Cancel External Request',
  CANCEL_FAILURE = '[Search][Requests] Cancel External Failure',
  CANCEL_SUCCESS = '[Search][Requests] Cancel External Success',
  OPEN_CANCEL_DIALOG = '[Search][External] Open Cancel Dialog',
  SAVE_REQUEST = '[Search][Request] Save Search Request',
  SAVE_FAILURE = '[Search][Request] Save Search Failure',
  SAVE_SUCCESS = '[Search][Request] Save Search Success',
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: RequestsPagination) {}
}

export class ChangeSorting implements Action {
  readonly type = ActionTypes.CHANGE_SORTING;
  constructor(public payload: object) {}
}


export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor() {}
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: Error }) {}
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: SearchRequestListQueryOutput) {}
}

export class SelectFailure implements Action {
  readonly type = ActionTypes.SELECT_FAILURE;
  constructor(public payload: {
    error: Error
  }) {}
}

export class SelectSuccess implements Action {
  readonly type = ActionTypes.SELECT_SUCCESS;
  constructor(public payload: GetRequestOutput) {}
}

export class ClearRequests implements Action {
  readonly type = ActionTypes.CLEAR_REQUESTS;
  constructor() {}
}

export class ClearPagination implements Action {
  readonly type = ActionTypes.CLEAR_PAGINATION;
  constructor() {}
}

export class RefreshRequests implements Action {
  readonly type = ActionTypes.REFRESH_REQUESTS;
  constructor() {}
}

export class SelectRequest implements Action {
  readonly type = ActionTypes.SELECT_REQUEST;
  constructor(public payload: number) {}
}

export class ExternalError implements Action {
  readonly type = ActionTypes.EXTERNAL_ERROR;

  constructor(public payload: {
    error: string
  }) {
  }
}

export class SSEExternalCompleted implements Action {
  readonly type = ActionTypes.SSE_EXTERNAL_COMPLETED;

  constructor(public payload: ExternalCompletedOutput) {
  }
}

export class ExternalRequest implements Action {
  readonly type = ActionTypes.EXTERNAL_REQUEST;

  constructor() {
  }
}

export class ExternalSuccess implements Action {
  readonly type = ActionTypes.EXTERNAL_SUCCESS;

  constructor(public payload: GetRequestOutput) {
  }
}

export class CancelRequest implements Action {
  readonly type = ActionTypes.CANCEL_REQUEST;
  constructor() {
  }
}

export class CancelSuccess implements Action {
  readonly type = ActionTypes.CANCEL_SUCCESS;
  constructor(public payload: GetRequestOutput) {
  }
}

export class CancelFailure implements Action {
  readonly type = ActionTypes.CANCEL_FAILURE;
  constructor(public payload: Error) {
  }
}

export class OpenCancelDialog implements Action {
  readonly type = ActionTypes.OPEN_CANCEL_DIALOG;

  constructor(public payload: object) {
  }
}

export class SaveRequest implements Action {
  readonly type = ActionTypes.SAVE_REQUEST;
  constructor(public payload: SearchRequestInput) { }
}

export class SaveFailure implements Action {
  readonly type = ActionTypes.SAVE_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class SaveSuccess implements Action {
  readonly type = ActionTypes.SAVE_SUCCESS;
  constructor(public payload: { id: number }) { }
}

export type Actions =
  ChangePagination
  | ChangeSorting
  | ClearRequests
  | ClearPagination
  | RefreshRequests
  | LoadFailure
  | LoadSuccess
  | LoadRequest
  | SelectRequest
  | SelectFailure
  | SelectSuccess
  | SSEExternalCompleted
  | ExternalError
  | ExternalRequest
  | ExternalSuccess
  | OpenCancelDialog
  | CancelRequest
  | CancelSuccess
  | CancelFailure
  | SaveRequest
  | SaveFailure
  | SaveSuccess;
