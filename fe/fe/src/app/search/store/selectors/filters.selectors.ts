import {createSelector} from '@ngrx/store';
import {getSearchState} from '@app/search/store/reducers';
import * as fromFilters from '@app/search/store/reducers/filters.reducer';


export const getFiltersState = createSelector(
  getSearchState,
  state => state.filters
);


export const getIsResultsFiltersDisabled = createSelector(
  getFiltersState,
  fromFilters.getIsResultsFiltersDisabled
);
