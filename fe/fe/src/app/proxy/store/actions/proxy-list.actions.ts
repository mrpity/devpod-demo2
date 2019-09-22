import { Action } from '@ngrx/store';
import {ProxyListModel} from '../../models/proxy.interface';

export enum ActionTypes {
  LOAD_REQUEST = '[Proxy][List] Load Data Request',
  LOAD_FAILURE = '[Proxy][List] Load Data Failure',
  LOAD_SUCCESS = '[Proxy][List] Load Data Success',
  FETCH_DATA = '[Proxy][List] Fetch Data With Current Filters',
  CHANGE_PAGINATION = '[Proxy][List] Change Pagination',
  CHANGE_FILTER = '[Proxy][List] Change Filters',
  CHANGE_SORTING = '[Proxy][List] Change Sorting',
  CLEAR_LIST_QUERY = '[Proxy][List] Clear Query Input',
  SELECT_PROXY = '[Proxy][List] Select Proxy',
  UNDO_SELECTED = '[Proxy][List] Reset seleted',
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: object) {}
}

export class ChangeFilter implements Action {
  readonly type = ActionTypes.CHANGE_FILTER;
  constructor(public payload: {
    searchQuery: string,
    pageNumber: number
  }) {}
}

export class ChangeSorting implements Action {
  readonly type = ActionTypes.CHANGE_SORTING;
  constructor(public payload: object) {}
}

export class FetchDataByDefault implements Action {
  readonly type = ActionTypes.FETCH_DATA;
  constructor() {}
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor() {}
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: string
  }) {}
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: ProxyListModel) {}
}

export class ClearListQuery implements Action {
  readonly type = ActionTypes.CLEAR_LIST_QUERY;
  constructor() {}
}

export class SelectProxy implements Action {
  readonly type = ActionTypes.SELECT_PROXY;
  constructor(public payload: number[]) {}
}

export class ResetSelected implements Action {
  readonly type = ActionTypes.UNDO_SELECTED;
  constructor() {}
}

export type Actions =
  LoadRequest
  | LoadFailure
  | LoadSuccess
  | ChangePagination
  | ChangeFilter
  | ChangeSorting
  | ClearListQuery
  | SelectProxy
  | ResetSelected;
