import { createSelector } from '@ngrx/store';
import * as fromPosts from '@app/search/store/reducers/posts.reducer';
import { getSearchState } from '@app/search/store/reducers';
import { getRouterParams } from '@app/store/app.selectors';
import { PostDocumentInput } from '@app/search/models/post.model';

export const getPostsState = createSelector(
  getSearchState,
  state => state.posts
);

export const getResultDetails = createSelector(
  getPostsState,
  fromPosts.getResultDetails
);

export const getSelectedId = createSelector(
  getRouterParams,
  (params: Partial<PostDocumentInput>) => {
    if (params) {
      return `${params.index}_${params.documentId}`;
    }
  }
);

export const getOrigins = createSelector(
  getPostsState,
  fromPosts.getOrigins
);

export const getIsOriginsLoading = createSelector(
  getPostsState,
  fromPosts.getIsOriginsLoading
);

export const getIsOriginsLoadingFailure = createSelector(
  getPostsState,
  fromPosts.getIsOriginsLoadingFailure
);

export const getOriginListQuery = createSelector(
  getPostsState,
  fromPosts.getOriginListQuery
);

export const getIsPostGeneralLoading = createSelector(
  getPostsState,
  fromPosts.getIsPostGeneralLoading
);
