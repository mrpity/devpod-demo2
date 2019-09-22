import { Action } from '@ngrx/store';
import { ResultListModel, ResultsPagination } from '@app/analytic/models/analytic-result.model';
import { ActivatedRoute } from '@angular/router';

export enum ActionTypes {
  LOAD_REQUEST = '[Analytic][Results][List] Load Results Request',
  LOAD_FAILURE = '[Analytic][Results][List] Load Results Failure',
  LOAD_SUCCESS = '[Analytic][Results][List] Load Results Success',
  CHANGE_PAGINATION = '[Analytic][Results] Change Pagination',
  CLEAR_LIST_QUERY_INPUT = '[Analytic][Results] Clear Query Input',
  CLEAR_RESULTS = '[Analytic][Results] Clear Results List',
  CLEAR_PAGINATION = '[Analytic][Results] Clear pagination',
  CLEAR_FILTERS = '[Analytic][Results][Filters] Clear Filters',
  DISABLE_FILTERS = '[Analytic][Results][Filters] Disable Filters',
  REFRESH_RESULTS = '[Analytic][Results] Refresh Results',
  LOADING_EXTERNAL_RESULTS = '[Analytic][External] Loading Results From External Sources',
  LOAD_DETAILS_REQUEST = '[Analytic][Results][Details] Load Result Details Request',
  LOAD_DETAILS_FAILURE = '[Analytic][Results][Details] Load Result Details Failure',
  LOAD_DETAILS_SUCCESS = '[Analytic][Results][Details] Load Result Details Success',
  CLOSE_DETAILS = '[Analytic][Results][Details] Close Result Details Page',
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: ResultsPagination) { }
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: ResultListModel) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class LoadDetailsSuccess implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_SUCCESS;
  constructor(public payload: ResultListModel) { }
}

export class LoadDetailsRequest implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_REQUEST;
  constructor() { }
}

export class LoadDetailsFailure implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class CloseDetails implements Action {
  readonly type = ActionTypes.CLOSE_DETAILS;
  constructor(public payload: { id: string, route: ActivatedRoute }) { }
}

export class ClearListQuery implements Action {
  readonly type = ActionTypes.CLEAR_LIST_QUERY_INPUT;
  constructor() { }
}

export class ClearResults implements Action {
  readonly type = ActionTypes.CLEAR_RESULTS;
  constructor() { }
}

export class ClearPagination implements Action {
  readonly type = ActionTypes.CLEAR_PAGINATION;
  constructor() { }
}

export class ClearFilters implements Action {
  readonly type = ActionTypes.CLEAR_FILTERS;
  constructor() { }
}

export class DisableFilters implements Action {
  readonly type = ActionTypes.DISABLE_FILTERS;
  constructor() { }
}

export class RefreshResults implements Action {
  readonly type = ActionTypes.REFRESH_RESULTS;
  constructor(public payload: number) { }
}

export class LoadingExternalResults implements Action {
  readonly type = ActionTypes.LOADING_EXTERNAL_RESULTS;
  constructor() { }
}

export type Actions =
  LoadRequest
  | LoadFailure
  | LoadSuccess
  | ChangePagination
  | ClearListQuery
  | ClearResults
  | ClearPagination
  | RefreshResults
  | ClearFilters
  | DisableFilters
  | LoadingExternalResults
  | LoadDetailsSuccess
  | LoadDetailsRequest
  | LoadDetailsFailure
  | CloseDetails;
