import { Action } from '@ngrx/store';

/**
 * For now, only for Posts detail component
 * */
export const ROUTER_BACK_TYPE = '[Router] Back';
export const ROUTER_FORWARD_TYPE = '[Router] Forward';

export class RouterBack implements Action {
  readonly type = ROUTER_BACK_TYPE;
}

export class RouterForward implements Action {
  readonly type = ROUTER_FORWARD_TYPE;
}


