import { Action } from '@ngrx/store';
import { AvatarCity, AvatarDetails } from '../../models/avatar.model';

export enum ActionTypes {
  GET_CURRENT_STATE_REQUEST = '[Avatar][Details] Get Current State Request',
  GET_CURRENT_STATE_FAILURE = '[Avatar][Details] Get Current State Failure',
  GET_CURRENT_STATE_SUCCESS = '[Avatar][Details] Get Current State Success',
  CHANGE_TAB = '[Avatar][Details] Change Tab',
  CLEAR_AVATAR_DETAILS = '[Avatar][Details][Clear State] Clear Avatar Data',
  SEARCH_CITIES_REQUEST = '[Avatar][Server Search] Cities Request',
  SEARCH_CITIES_FAILURE = '[Avatar][Server Search] Cities Failure',
  SEARCH_CITIES_SUCCESS = '[Avatar][Server Search] Cities Success',
  CLEAR_CITIES = '[Avatar][Clear State] Clear Cities'
}

export class SearchCitiesRequest implements Action {
  readonly type = ActionTypes.SEARCH_CITIES_REQUEST;
  constructor(public payload: string) {}
}

export class SearchCitiesFailure implements Action {
  readonly type = ActionTypes.SEARCH_CITIES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SearchCitiesSuccess implements Action {
  readonly type = ActionTypes.SEARCH_CITIES_SUCCESS;
  constructor(public payload: AvatarCity[]) {}
}

export class ClearCities implements Action {
  readonly type = ActionTypes.CLEAR_CITIES;
  constructor() {}
}

export class ChangeTab implements Action {
  readonly type = ActionTypes.CHANGE_TAB;
  constructor(public payload: { tabIndex: number }) {}
}

export class ClearAvatarData implements Action {
  readonly type = ActionTypes.CLEAR_AVATAR_DETAILS;
  constructor() {}
}

export class GetCurrentStateRequest implements Action {
  readonly type = ActionTypes.GET_CURRENT_STATE_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class GetCurrentStateFailure implements Action {
  readonly type = ActionTypes.GET_CURRENT_STATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetCurrentStateSuccess implements Action {
  readonly type = ActionTypes.GET_CURRENT_STATE_SUCCESS;
  constructor(public payload: AvatarDetails) {}
}

export type Actions =
  SearchCitiesRequest | SearchCitiesFailure | SearchCitiesSuccess |
  ClearCities | ChangeTab | ClearAvatarData |
  GetCurrentStateRequest | GetCurrentStateFailure | GetCurrentStateSuccess;
