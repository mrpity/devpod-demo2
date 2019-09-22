import * as fromWebPage from '@app/search/store/reducers/webpage.reducer';
import { createSelector } from '@ngrx/store';
import { getSearchState } from '@app/search/store/reducers';
import { getRouterParams } from '@app/store/app.selectors';
import {PostDocumentInput, ResultDocumentInput} from '@app/search/models/post.model';

export const getWebPageState = createSelector(
  getSearchState,
  state => state.webpage
);

export const getResultDetails = createSelector(
  getWebPageState,
  fromWebPage.getResultDetails
);


export const getSelectedId = createSelector(
  getRouterParams,
  (params: Partial<ResultDocumentInput>) => {
    if (params) {
      return `${params.index}_${params.documentId}`;
    }
  }
);

export const getIsLoading = createSelector(
  getWebPageState,
  fromWebPage.getIsLoading
);
