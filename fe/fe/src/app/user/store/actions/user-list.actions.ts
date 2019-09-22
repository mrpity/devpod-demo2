import { Action } from '@ngrx/store';
import { UserList } from '../../models/user.model';

export enum ActionTypes {
  LOAD_REQUEST = '[User Management][List] Load Data Request',
  LOAD_FAILURE = '[User Management][List] Load Data Failure',
  LOAD_SUCCESS = '[User Management][List] Load Data Success',
  FETCH_DATA = '[User Management][List] Fetch Data With Current Filters',
  CHANGE_PAGINATION = '[User Management][List] Change Pagination',
  CHANGE_SORTING = '[User Management][List] Change Sorting',
  CLEAR_LIST_QUERY = '[User Management][List] Clear Query Input',
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: object) {}
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
  constructor(public payload: UserList) {}
}

export class ClearListQuery implements Action {
  readonly type = ActionTypes.CLEAR_LIST_QUERY;
  constructor() {}
}

export type Actions =
  LoadRequest
  | LoadFailure
  | LoadSuccess
  | ChangePagination
  | ChangeSorting
  | ClearListQuery;
