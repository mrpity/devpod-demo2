import { combineReducers, ActionReducerMap } from '@ngrx/store';
import {
  UserListActions,
  UserCrudActions
} from './actions';
import { initialState, State, adapterUser, UserEntityState } from './user.state';
import { UserListQueryModel } from '../models/user.model';
import { InjectionToken } from '@angular/core';

export function users (
  state = initialState.users,
  action: UserListActions.Actions | UserCrudActions.Actions
): UserEntityState {
  switch (action.type) {
    case UserListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case UserListActions.ActionTypes.LOAD_SUCCESS: {
      return adapterUser.upsertMany(action.payload.items, state);
    }
    case UserCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return adapterUser.upsertOne(action.payload, state);
    }
    case UserCrudActions.ActionTypes.UPDATE_REQUEST: {
      return adapterUser.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }
    default: {
      return state;
    }
  }
}

export function currentUsersIds (
  state = initialState.currentUsersIds,
  action: UserListActions.Actions | UserCrudActions.Actions
): number[] {
  switch (action.type) {
    case UserListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case UserListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.items.map(item => item.id);
    }
    default: {
      return state;
    }
  }
}

export function selectedUserId (
  state = initialState.selectedUserId,
  action: UserCrudActions.Actions
): number {
  switch (action.type) {
    case UserCrudActions.ActionTypes.LOAD_DETAILS_REQUEST: {
      return action.payload.id;
    }
    default: {
      return state;
    }
  }
}

export function totalUsersCount (
  state = initialState.totalUsersCount,
  action: UserListActions.Actions
): number {
  switch (action.type) {
    case UserListActions.ActionTypes.LOAD_REQUEST:
    case UserListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case UserListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemsCount;
    }
    default: {
      return state;
    }
  }
}

export function listQuery (
  state = initialState.listQuery,
  action: UserListActions.Actions
): UserListQueryModel {
  switch (action.type) {
    case UserListActions.ActionTypes.CHANGE_PAGINATION:
    case UserListActions.ActionTypes.CHANGE_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case UserListActions.ActionTypes.CLEAR_LIST_QUERY: {
      return initialState.listQuery;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: UserListActions.Actions | UserCrudActions.Actions
): boolean {
  switch (action.type) {
    case UserListActions.ActionTypes.LOAD_REQUEST:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case UserCrudActions.ActionTypes.UPDATE_REQUEST:
    case UserCrudActions.ActionTypes.CREATE_NEW_REQUEST: {
      return true;
    }
    case UserListActions.ActionTypes.LOAD_FAILURE:
    case UserListActions.ActionTypes.LOAD_SUCCESS:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS:
    case UserCrudActions.ActionTypes.UPDATE_FAILURE:
    case UserCrudActions.ActionTypes.UPDATE_SUCCESS:
    case UserCrudActions.ActionTypes.CREATE_NEW_FAILURE:
    case UserCrudActions.ActionTypes.CREATE_NEW_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function error (
  state = initialState.isLoading,
  action: UserListActions.Actions | UserCrudActions.Actions
): any {
  switch (action.type) {
    case UserListActions.ActionTypes.LOAD_REQUEST:
    case UserListActions.ActionTypes.LOAD_SUCCESS:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return null;
    }
    case UserListActions.ActionTypes.LOAD_FAILURE:
    case UserCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return action.payload.error;
    }
    default: {
      return state;
    }
  }
}

// Combine reducers
// Add token for 'production' mode
export const reducers = combineReducers({
  users,
  selectedUserId,
  currentUsersIds,
  totalUsersCount,
  listQuery,
  isLoading,
  error,
  // isCreateBtnDisabled
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('UserReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const selectUsers = (state: State): UserEntityState => state.users;
export const selectCurrentUsersIds = (state: State): number[] => state.currentUsersIds;
export const selectSelectedUserId = (state: State): number => state.selectedUserId;
export const selectTotalUsersCount = (state: State): number => state.totalUsersCount;
export const selectError = (state: State): any => state.error;
export const selectIsLoading = (state: State): boolean => state.isLoading;
export const selectListQuery = (state: State): UserListQueryModel => state.listQuery;
export const selectSortBy = (state: State): object => state.listQuery.sortBy;
// export const getIsCreateBtnDisabled = (state: State): boolean => state.isCreateBtnDisabled;
