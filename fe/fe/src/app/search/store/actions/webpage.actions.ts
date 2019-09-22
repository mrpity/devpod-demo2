import {Action} from '@ngrx/store';
import {ResultDocumentInput} from '@app/search/models/post.model';
import {ActivatedRoute} from '@angular/router';
import {Result} from '@app/search/models/result.model';
import {WebPageOutput} from '@app/search/models/webpage.model';

export enum ActionTypes {
  LOAD_REQUEST = '[Search][Results][Webpage] Load Result Detail Request',
  LOAD_FAILURE = '[Search][Results][Webpage] Load Result Detail Failure',
  LOAD_SUCCESS = '[Search][Results][Webpage] Load Result Detail Success',
  CLOSE_DETAILS = '[Search][Results][Webpage] Close Webpage Page',
  OPEN_DETAILS = '[Search][Results][Webpage] Open Webpage Details Page',
  SWITCH_TAB = '[Search][Details][Webpage] Switch Tab',
  GET_PROFILE_TABS = '[Search][Details][Webpage] Get Webpage Tabs',
  CHANGE_PAGINATION = '[Search][Details][Webpage] Change Pagination',
  CLEAR_PAGINATION = '[Search][Details][Webpage] Clear Pagination',
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: ResultDocumentInput) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: WebPageOutput) { }
}

export class CloseDetails implements Action {
  readonly type = ActionTypes.CLOSE_DETAILS;
  constructor(public payload: { id: string, route: ActivatedRoute }) { }
}

export class OpenDetails implements Action {
  readonly type = ActionTypes.OPEN_DETAILS;
  constructor(public payload: { result: Result, route: ActivatedRoute }) { }
}

export class SwitchTab implements Action {
  readonly type = ActionTypes.SWITCH_TAB;
  constructor(public payload: number) { }
}

export class GetWebPageTabs implements Action {
  readonly type = ActionTypes.GET_PROFILE_TABS;
  constructor() { }
}

export class ChangePagination implements Action {
  readonly type = ActionTypes.CHANGE_PAGINATION;
  constructor(public payload: object) { }
}

export class ClearPagination implements Action {
  readonly type = ActionTypes.CLEAR_PAGINATION;
  constructor() { }
}

export type Actions =
  LoadRequest
  | LoadFailure
  | LoadSuccess
  | OpenDetails
  | SwitchTab
  | GetWebPageTabs
  | ChangePagination
  | ClearPagination
  | CloseDetails;
