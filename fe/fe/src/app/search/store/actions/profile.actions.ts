import { Action } from '@ngrx/store';
import { Result } from '@app/search/models/result.model';
import { ResultDocumentInput } from '@app/search/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileOutput } from '@app/search/models/profile.model';

export enum ActionTypes {
  LOAD_REQUEST = '[Search][Results][Profile] Load Result Detail Request',
  LOAD_FAILURE = '[Search][Results][Profile] Load Result Detail Failure',
  LOAD_SUCCESS = '[Search][Results][Profile] Load Result Detail Success',
  LOAD_PHOTO_REQUEST = '[Search][Results][Profile] Load Result Photo Request',
  LOAD_PHOTO_FAILURE = '[Search][Results][Profile] Load Result Photo Failure',
  LOAD_PHOTO_SUCCESS = '[Search][Results][Profile] Load Result Photo Success',
  CLOSE_DETAILS = '[Search][Results][Profile] Close Profile Page',
  OPEN_DETAILS = '[Search][Results][Profile] Open Profile Page',
  SWITCH_TAB = '[Search][Details][Profile] Switch Tab',
  GET_PROFILE_TABS = '[Search][Details][Profile] Get Profile Tabs',
  CHANGE_PAGINATION = '[Search][Details][Profile] Change Pagination',
  CLEAR_PAGINATION = '[Search][Details][Profile] Clear Pagination',
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
  constructor(public payload: ProfileOutput) { }
}

export class LoadPhotoRequest implements Action {
  readonly type = ActionTypes.LOAD_PHOTO_REQUEST;
  constructor(public payload: string) { }
}

export class LoadPhotoFailure implements Action {
  readonly type = ActionTypes.LOAD_PHOTO_FAILURE;
  constructor(public payload: {
    error: Error
  }) { }
}

export class LoadPhotoSuccess implements Action {
  readonly type = ActionTypes.LOAD_PHOTO_SUCCESS;
  constructor(public payload: string) { }
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

export class GetProfileTabs implements Action {
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
  | LoadPhotoRequest
  | LoadPhotoFailure
  | LoadPhotoSuccess
  | OpenDetails
  | SwitchTab
  | GetProfileTabs
  | ChangePagination
  | ClearPagination
  | CloseDetails;
