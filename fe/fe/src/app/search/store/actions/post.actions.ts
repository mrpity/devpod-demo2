import { Action } from '@ngrx/store';
import { Result } from '@app/search/models/result.model';
import { PostDocumentInput, PostOutput } from '@app/search/models/post.model';
import { ActivatedRoute } from '@angular/router';

export enum ActionTypes {
  LOAD_REQUEST = '[Search][Results][Post] Load Result General Info Request',
  LOAD_FAILURE = '[Search][Results][Post] Load Result Detail Failure',
  LOAD_SUCCESS = '[Search][Results][Post] Load Result Detail Success',
  OPEN_DETAILS = '[Search][Results][Post] Open Post Details Page',
  OPEN_ORIGIN_DETAILS = '[Search][Results][Post][Origin] Open Post Origin Details Page',
  DESTROY_COMPONENT = '[Search] Destroy Component',
  UPDATE_DETAILS_ID = '[Search][Details] Update Details ID From URL',
  FIND_ORIGIN_DOCUMENTS = '[Search][Details] Find Origin Documents',
  FIND_ORIGIN_DOCUMENTS_SUCCESS = '[Search][Results][Post][Origin] Find Origin Documents Success',
  FIND_ORIGIN_DOCUMENTS_FAILURE = '[Search][Results][Post][Origin] Find Origin Documents Failure',
  SWITCH_TAB = '[Search][Details][Post] Switch Tab',
  GET_POST_TABS = '[Search][Details][Post] Get Post Tabs',
  CHANGE_PAGINATION = '[Search][Details][Post][Origin] Change Pagination',
  CLEAR_PAGINATION = '[Search][Details][Post][Origin] Clear Pagination',
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: PostDocumentInput) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: PostOutput) { }
}

export class OpenDetails implements Action {
  readonly type = ActionTypes.OPEN_DETAILS;
  constructor(public payload: { result: Result, route: ActivatedRoute }) { }
}

export class OpenOriginDetails implements Action {
  readonly type = ActionTypes.OPEN_ORIGIN_DETAILS;
  constructor(public payload: { result: Result, route: ActivatedRoute }) { }
}

export class DestroyComponent implements Action {
  readonly type = ActionTypes.DESTROY_COMPONENT;
  constructor() { }
}

export class UpdateDetailsId implements Action {
  readonly type = ActionTypes.UPDATE_DETAILS_ID;
  constructor(public payload: PostDocumentInput) { }
}

export class FindOriginDocuments implements Action {
  readonly type = ActionTypes.FIND_ORIGIN_DOCUMENTS;
  constructor(public payload: PostDocumentInput) { }
}

export class FindOriginDocumentsSuccess implements Action {
  readonly type = ActionTypes.FIND_ORIGIN_DOCUMENTS_SUCCESS;
  constructor(public payload: Result[]) { }
}

export class FindOriginDocumentsFailure implements Action {
  readonly type = ActionTypes.FIND_ORIGIN_DOCUMENTS_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class SwitchTab implements Action {
  readonly type = ActionTypes.SWITCH_TAB;
  constructor(public payload: number) { }
}

export class GetPostTabs implements Action {
  readonly type = ActionTypes.GET_POST_TABS;
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
  | DestroyComponent
  | UpdateDetailsId
  | FindOriginDocuments
  | FindOriginDocumentsSuccess
  | FindOriginDocumentsFailure
  | SwitchTab
  | GetPostTabs
  | ChangePagination
  | ClearPagination
  | OpenOriginDetails;
