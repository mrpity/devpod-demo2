import { createSelector } from '@ngrx/store';
import * as fromResults from '@app/search/store/reducers/results.reducer';
import { getSearchState } from '@app/search/store/reducers';
import { getSelectedRequestId } from '@app/search/store/selectors/requests.selectors';

export const getResultsState = createSelector(
  getSearchState,
  state => state.results
);

export const getResults = createSelector(
  getResultsState,
  fromResults.getResults
);

export const getResultsTotal = createSelector(
  getResultsState,
  fromResults.getResultsTotal
);

export const getSelectedResultId = createSelector(
  getResultsState,
  fromResults.getSelectedResultId
);

export const getIsResultsLoading = createSelector(
  getResultsState,
  fromResults.getIsResultsLoading
);

export const getIsResultsLoaded = createSelector(
  getResultsState,
  fromResults.getIsResultsLoaded
);

export const getIsResultsLoadingFailure = createSelector(
  getResultsState,
  fromResults.getIsResultsLoadingFailure
);


export const getIsExternalResultsLoading = createSelector(
  getResultsState,
  fromResults.getIsExternalResultsLoading
);


export const getSearchListQuery = createSelector(
  getResultsState,
  getSelectedRequestId,
  fromResults.getSearchListQuery
);

export const getError = createSelector(
  getResultsState,
  fromResults.getError
);

export const getIsSpinner = createSelector(
  getResultsState,
  fromResults.getIsSpinner
);

export const {
  selectAll: selectAllResults,
  selectEntities: selectEntitiesResults,
  selectIds: selectResultIds,
  selectTotal: selectResultsTotal
} = fromResults.adapterResults.getSelectors(getResults);
