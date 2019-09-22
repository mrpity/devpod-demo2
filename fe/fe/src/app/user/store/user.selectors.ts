import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapterUser } from './user.state';
import * as fromUser from './user.reducers';

// Create User Selectors
const selectUserState = createFeatureSelector<State>('user');

const selectUsers = createSelector(
  selectUserState,
  fromUser.selectUsers
);

const selectSelectedUserId = createSelector(
  selectUserState,
  fromUser.selectSelectedUserId
);

const selectCurrentUsersIds = createSelector(
  selectUserState,
  fromUser.selectCurrentUsersIds
);

const {
  selectAll: selectUserAll,
  selectEntities: selectUserEntities
} = adapterUser.getSelectors(selectUsers);

export const getTotalUsersCount = createSelector(
  selectUserState,
  fromUser.selectTotalUsersCount
);

export const getListQuery = createSelector(
  selectUserState,
  fromUser.selectListQuery
);

export const getError = createSelector(
  selectUserState,
  fromUser.selectError
);

export const getIsLoading = createSelector(
  selectUserState,
  fromUser.selectIsLoading
);

export const getSortBy = createSelector(
  selectUserState,
  fromUser.selectSortBy
);

export const getCurrentUsers = createSelector(
  selectUserAll,
  selectCurrentUsersIds,
  (items, ids) => items
    .filter(({ id }) => ids.includes(id))
    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
);

export const getOneUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (items, id) => items[id]
);
