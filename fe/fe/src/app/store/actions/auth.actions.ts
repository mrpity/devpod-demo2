import { Action } from '@ngrx/store';

export enum ActionTypes {
  CLEAR_STATE = '[Auth][Logout] Clear state'
}

export class LogoutClearState implements Action {
  readonly type = ActionTypes.CLEAR_STATE;
  constructor() {}
}


export type Actions = LogoutClearState;
