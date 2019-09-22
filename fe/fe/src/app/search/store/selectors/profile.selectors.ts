import * as fromProfile from '@app/search/store/reducers/profile.reducer';
import { createSelector } from '@ngrx/store';
import { getSearchState } from '@app/search/store/reducers';
import { getRouterParams } from '@app/store/app.selectors';
import { PostDocumentInput } from '@app/search/models/post.model';

export const getProfileState = createSelector(
  getSearchState,
  state => state.profile
);

export const getResultDetails = createSelector(
  getProfileState,
  fromProfile.getResultDetails
);

export const getFriends = createSelector(
  getProfileState,
  fromProfile.getFriends
);

export const getSelectedId = createSelector(
  getRouterParams,
  (params: Partial<PostDocumentInput>) => {
    if (params) {
      return `${params.index}_${params.documentId}`;
    }
  }
);

export const getIsLoading = createSelector(
  getProfileState,
  fromProfile.getIsLoading
);
