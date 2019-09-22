import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { ProxyListActions, ProxyDetailsActions, ProxyAddActions, ProxyDeleteActions } from './actions/index';
import { initialState, State } from './proxy.state';
import { Proxy, ProxyDetailsModel, ProxyListQueryModel } from '../models/proxy.interface';
import { InjectionToken } from '@angular/core';


export function proxies (
  state = initialState.proxies,
  action: ProxyListActions.Actions | ProxyDetailsActions.Actions | ProxyAddActions.Actions
): Proxy[] {
  switch (action.type) {
    case ProxyListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case ProxyListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.proxies;
    }
    default: {
      return state;
    }
  }
}

export function countries (
  state = initialState.countries,
  action: ProxyAddActions.Actions
): string[] {
  switch (action.type) {
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_FAILURE:
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_REQUEST: {
      return state;
    }
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_SUCCESS: {
      return action.payload.countries;
    }
    default: {
      return state;
    }
  }
}

export function types (
  state = initialState.types,
  action: ProxyAddActions.Actions
): string[] {
  switch (action.type) {
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_FAILURE:
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_REQUEST: {
      return state;
    }
    case ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_SUCCESS: {
      return action.payload.types;
    }
    default: {
      return state;
    }
  }
}

export function proxiesTotal (
  state = initialState.proxiesTotal,
  action: ProxyListActions.Actions
): number {
  switch (action.type) {
    case ProxyListActions.ActionTypes.LOAD_REQUEST:
    case ProxyListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case ProxyListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemCount;
    }
    default: {
      return state;
    }
  }
}

export function listQuery (
  state = initialState.listQuery,
  action: ProxyListActions.Actions
): ProxyListQueryModel {
  switch (action.type) {
    case ProxyListActions.ActionTypes.CHANGE_FILTER:
    case ProxyListActions.ActionTypes.CHANGE_PAGINATION:
    case ProxyListActions.ActionTypes.CHANGE_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ProxyListActions.ActionTypes.CLEAR_LIST_QUERY: {
      return initialState.listQuery;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: ProxyListActions.Actions
): boolean {
  switch (action.type) {
    case ProxyListActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case ProxyListActions.ActionTypes.LOAD_FAILURE:
    case ProxyListActions.ActionTypes.LOAD_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function error (
  state = initialState.isLoading,
  action: ProxyListActions.Actions | ProxyDetailsActions.Actions
): any {
  switch (action.type) {
    case ProxyListActions.ActionTypes.LOAD_REQUEST:
    case ProxyListActions.ActionTypes.LOAD_SUCCESS:
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return null;
    }
    case ProxyListActions.ActionTypes.LOAD_FAILURE:
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return action.payload.error;
    }
    default: {
      return state;
    }
  }
}

export function selected (
  state = initialState.selected,
  action: ProxyDetailsActions.Actions
): any {
  switch (action.type) {
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_REQUEST: {
      return {
        id: action.payload.id
      };
    }
    case ProxyDetailsActions.ActionTypes.CLEAR_PROXY_DETAILS: {
      return initialState.selected;
    }
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_FAILURE:
    default: {
      return state;
    }
  }
}

export function selectedDetails (
  state = initialState.selectedDetails,
  action: ProxyDetailsActions.Actions
): ProxyDetailsModel {
  switch (action.type) {
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return state;
    }
    case ProxyDetailsActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return action.payload;
    }
    case ProxyDetailsActions.ActionTypes.CLEAR_PROXY_DETAILS: {
      return initialState.selectedDetails;
    }
    default: {
      return state;
    }
  }
}


export function isAddBtnDisabled (
  state = initialState.isAddBtnDisabled,
  action: ProxyAddActions.Actions
): boolean {
  switch (action.type) {
    case ProxyAddActions.ActionTypes.ADD_NEW_REQUEST: {
      return true;
    }
    case ProxyAddActions.ActionTypes.ADD_NEW_SUCCESS:
    case ProxyAddActions.ActionTypes.ADD_NEW_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function selectedProxies (
  state = initialState.selectedProxies,
  action: ProxyListActions.Actions
): number[] {
  switch (action.type) {
    case ProxyListActions.ActionTypes.SELECT_PROXY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function clearSelected (
  state = initialState.clearSelected,
  action: ProxyDeleteActions.Actions | ProxyListActions.Actions
): boolean {
  switch (action.type) {
    case ProxyDeleteActions.ActionTypes.DELETE_SUCCESS: {
      return true;
    }
    case ProxyListActions.ActionTypes.UNDO_SELECTED: {
      return initialState.clearSelected;
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({
  proxies,
  selectedProxies,
  proxiesTotal,
  listQuery,
  isLoading,
  error,
  selected,
  selectedDetails,
  isAddBtnDisabled,
  countries,
  types,
  clearSelected
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('ProxyReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const getProxies = (state: State): Proxy[] => state.proxies;
export const getSelected = (state: State): any => state.selected;
export const getSelectedDetails = (state: State): ProxyDetailsModel => state.selectedDetails;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getProxiesTotal = (state: State): number => state.proxiesTotal;
export const getCountries = (state: State): string[] => state.countries;
export const getTypes = (state: State): string[] => state.types;
export const getListQuery = (state: State): ProxyListQueryModel => state.listQuery;
export const getSortBy = (state: State): object => state.listQuery.sortBy;
export const getIsAddBtnDisabled = (state: State): boolean => state.isAddBtnDisabled;
export const getSelectedProxies = (state: State): number[] => state.selectedProxies;
export const getClearSelected = (state: State): boolean => state.clearSelected;
