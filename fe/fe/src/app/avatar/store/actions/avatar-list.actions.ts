import { Action } from '@ngrx/store';
import { AvatarListModel, AvatarFiltersModel } from '../../models/avatar.model';

export enum ActionTypes {
  LOAD_REQUEST = '[Avatar][List] Load Data Request',
  LOAD_FAILURE = '[Avatar][List] Load Data Failure',
  LOAD_SUCCESS = '[Avatar][List] Load Data Success',
  FETCH_DATA = '[Avatar][List] Fetch Data With Current Filters',
  CHANGE_PAGINATION = '[Avatar][List] Change Pagination',
  CHANGE_FILTER = '[Avatar][List] Change Filters',
  CHANGE_SORTING = '[Avatar][List] Change Sorting',
  CLEAR_LIST_QUERY = '[Avatar][List] Clear Query Input',
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: object) {}
}

export class ChangeFilter implements Action {
  readonly type = ActionTypes.CHANGE_FILTER;
  constructor(public payload: {
    filter: Partial<AvatarFiltersModel>,
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
  constructor(public payload: AvatarListModel) {}
}

export class ClearListQuery implements Action {
  readonly type = ActionTypes.CLEAR_LIST_QUERY;
  constructor() {}
}

export type Actions =
  LoadRequest | LoadFailure | LoadSuccess |
  ChangePagination | ChangeFilter | ChangeSorting | ClearListQuery;
