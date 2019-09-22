import {
  createFeatureSelector,
  createSelector,
  // MemoizedSelector
} from '@ngrx/store';

import { State } from './avatar.state';
import * as fromAvatar from './avatar.reducers';

// Create Avatar Selectors
export const selectAvatarState =
  createFeatureSelector<State>('avatar');

export const getAvatars = createSelector(
  selectAvatarState,
  fromAvatar.getAvatars
);

export const getAvatarsTotal = createSelector(
  selectAvatarState,
  fromAvatar.getAvatarsTotal
);

export const getListQuery = createSelector(
  selectAvatarState,
  fromAvatar.getListQuery
);

export const getError = createSelector(
  selectAvatarState,
  fromAvatar.getError
);

export const getIsLoading = createSelector(
  selectAvatarState,
  fromAvatar.getIsLoading
);

export const getSelectedDetails = createSelector(
  selectAvatarState,
  fromAvatar.getSelectedDetails
);

export const getSelected = createSelector(
  selectAvatarState,
  fromAvatar.getSelected
);

export const getConnections = createSelector(
  selectAvatarState,
  fromAvatar.getConnections
);

export const getProxies = createSelector(
  selectAvatarState,
  fromAvatar.getProxies
);

export const getCurrentTab = createSelector(
  selectAvatarState,
  fromAvatar.getCurrentTab
);

export const getSortBy = createSelector(
  selectAvatarState,
  fromAvatar.getSortBy
);

export const getIsCreateBtnDisabled = createSelector(
  selectAvatarState,
  fromAvatar.getIsCreateBtnDisabled
);

export const getCities = createSelector(
  selectAvatarState,
  fromAvatar.getCities
);

export const getStatus = createSelector(
  selectAvatarState,
  fromAvatar.getStatus
);

export const getImportDiffs = createSelector(
  selectAvatarState,
  fromAvatar.getImportDiffs
);

export const getExportSummaries = createSelector(
  selectAvatarState,
  fromAvatar.getExportSummaries
);

export const getAwaitImportConfirmation = createSelector(
  selectAvatarState,
  fromAvatar.getAwaitImportConfirmation
);

export const isImport = createSelector(
  selectAvatarState,
  fromAvatar.isImport
);

export const isExport = createSelector(
  selectAvatarState,
  fromAvatar.isExport
);

export const isAwaitImportConfirmation = createSelector(
  selectAvatarState,
  fromAvatar.isAwaitImportConfirmation
);

export const isAwaitExportReview = createSelector(
  selectAvatarState,
  fromAvatar.isAwaitExportReview
);

export const isImportExportEnabled = createSelector(
  selectAvatarState,
  fromAvatar.isImportExportEnabled
);

export const getAvatarLog = createSelector(
  selectAvatarState,
  fromAvatar.getAvatarLog
);

// export const avatarListState: MemoizedSelector<
//   object,
//   RequestsState
// > = createFeatureSelector<RequestsState>('avatar');

// export const getAvatarList: (
//   state: object
// ) => Avatar[] = featureAdapter.getSelectors(avatarListState).selectAll;

// export const selectJokeError: MemoizedSelector<object, any> = createSelector(
//   avatarListState,
//   getError
// );

// export const selectJokeIsLoading: MemoizedSelector<
//   object,
//   boolean
// > = createSelector(avatarListState, getIsLoading);
