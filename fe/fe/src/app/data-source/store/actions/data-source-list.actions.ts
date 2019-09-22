import { Action } from '@ngrx/store';
import {
  DataSourceListStatuses,
  DataSourceList,
  DataSourceUpdatedData,
  DataSourceFiltersModel
} from '@app/data-source/models/data-source.model';

export enum ActionTypes {
  LOAD_REQUEST = '[Data Source][List] Load Data Request',
  LOAD_FAILURE = '[Data Source][List] Load Data Failure',
  LOAD_SUCCESS = '[Data Source][List] Load Data Success',
  FETCH_DATA = '[Data Source][List] Fetch Data With Current Filters',
  CHANGE_PAGINATION = '[Data Source][List] Change Pagination',
  CHANGE_SORTING = '[Data Source][List] Change Sorting',
  CHANGE_FILTER = '[Data Source][List] Change Filters',
  CLEAR_LIST_QUERY = '[Data Source][List] Clear Query Input',
  LIST_STATUSES_LOAD = '[Data Source][List] List Statuses Load Request',
  LIST_STATUSES_FAILURE = '[Data Source][List] List Statuses Request Failed',
  LIST_STATUSES__SUCCESS = '[Data Source][List] List Statuses Request Success ',
  DATASOURCE_UPDATED_SSE = '[Data Source][List] Data Source Updated By SSE',
}

export class FetchDataByDefault implements Action {
  readonly type = ActionTypes.FETCH_DATA;
  constructor() { }
}

export class ChangeSorting implements Action {
  readonly type = ActionTypes.CHANGE_SORTING;
  constructor(public payload: object) { }
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: object) { }
}

export class ChangeFilter implements Action {
  readonly type = ActionTypes.CHANGE_FILTER;
  constructor(public payload: {
    // filter: Partial<DataSourceFiltersModel>,
    searchQuery: string,
    pageNumber: number
  }) { }
}

export class ClearListQuery implements Action {
  readonly type = ActionTypes.CLEAR_LIST_QUERY;
  constructor() { }
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor() { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: string
  }) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: DataSourceList) { }
}

export class ListStatusesLoad {
  readonly type = ActionTypes.LIST_STATUSES_LOAD;
  constructor() { }
}
export class ListStatusesFailure {
  readonly type = ActionTypes.LIST_STATUSES_FAILURE;
  constructor(public payload: {
    error: string
  }) { }
}
export class ListStatusesSuccess {
  readonly type = ActionTypes.LIST_STATUSES__SUCCESS;
  constructor(public payload: DataSourceListStatuses) { }
}

export class DataSourceUpdated {
  readonly type = ActionTypes.DATASOURCE_UPDATED_SSE;
  constructor(public payload: DataSourceUpdatedData) { }
}

export type Actions = FetchDataByDefault |
  ChangeSorting |
  ChangePagination |
  ChangeFilter |
  LoadRequest |
  LoadFailure |
  LoadSuccess |
  ClearListQuery |
  ListStatusesLoad |
  ListStatusesFailure |
  ListStatusesSuccess |
  DataSourceUpdated;
