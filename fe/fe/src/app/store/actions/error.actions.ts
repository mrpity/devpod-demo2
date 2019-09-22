import { Action } from '@ngrx/store';
import { GraphqlError } from '@app/models/error.model';

export enum ActionTypes {
  APP_IS_OFFLINE = '[App] App is offline',
  APP_IS_ONLINE = '[App] App is online',
  GRAPHQL_REQUEST_ERROR = '[APP] Graphql Request Error'
}

export class GoOffline implements Action {
  readonly type = ActionTypes.APP_IS_OFFLINE;
  constructor() {}
}

export class GoOnline implements Action {
  readonly type = ActionTypes.APP_IS_ONLINE;
  constructor() {}
}

export class GraphqlRequestError implements Action {
  readonly type = ActionTypes.GRAPHQL_REQUEST_ERROR;
  constructor(public payload: {message: string, operationName: string}) {}
}


export type Actions = GoOffline | GoOnline | GraphqlRequestError;
