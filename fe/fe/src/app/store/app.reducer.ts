import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';
import { SearchStoreActions } from '@app/search/store';

import { getReducers as fromAvatar } from '../avatar/store/avatar.reducers';
import { getReducers as fromProxy } from '../proxy/store/proxy.reducers';
import { State } from './app.state';
import { InjectionToken } from '@angular/core';

// Global reducers map
export const reducer: ActionReducerMap<State> = {
  avatar: fromAvatar(),
  proxy: fromProxy(),
  router: routerReducer,
};

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers() {
  return reducer;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

// Logger function
export function logger(reducerToWrap: ActionReducer<State>): any {
  return storeLogger()(reducerToWrap);
}

/**
 * Here we insert middleware(aka MetaReducer) to clear PostDetails state after close action* */
export function clearState(reducerToWrap: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const newState = {...state};
    if (action.type === SearchStoreActions.ResultsActions.ActionTypes.CLOSE_DETAILS) {
      newState.search.posts = undefined;
    }
    return reducerToWrap(newState, action);
  };
}

// Include meta reducers with logger middleware
export const metaReducers: MetaReducer<State>[] = [clearState];
