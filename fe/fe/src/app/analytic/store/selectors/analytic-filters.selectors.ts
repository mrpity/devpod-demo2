import { createSelector } from '@ngrx/store';
import { getAnalyticState } from '@app/analytic/store/reducers';
import * as fromFilters from '@app/analytic/store/reducers/analytic-filters.reducer';


export const getFiltersState = createSelector(
  getAnalyticState,
  state => state.filters
);


export const getIsResultsFiltersDisabled = createSelector(
  getFiltersState,
  fromFilters.getIsResultsFiltersDisabled
);
