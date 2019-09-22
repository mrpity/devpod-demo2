import { RequestsActions, ResultsActions } from '@app/search/store/actions';
import { ResourceTypesEnum } from '@app/search/models/request.model';
import { ResultTypesEnum } from '@app/search/models/result.model';

export interface FiltersState {
  query: string;
  resourceTypes: ResourceTypesEnum[];
  resultTypes: ResultTypesEnum[] | undefined;
  toDate: string;
  fromDate: string;
  isResultsFiltersDisabled: boolean;
}

export const initialState: FiltersState = {
  query: '',
  resourceTypes: [],
  resultTypes: [],
  toDate: '',
  fromDate: '',
  isResultsFiltersDisabled: false
};


export function reducer(
  state = initialState,
  action: ResultsActions.Actions | RequestsActions.Actions
): FiltersState {
  switch (action.type) {
    case RequestsActions.ActionTypes.SAVE_REQUEST:
    case RequestsActions.ActionTypes.SELECT_SUCCESS:
    case RequestsActions.ActionTypes.EXTERNAL_SUCCESS: {
      const {query, filter} = action.payload;
      return {
        ...state,
        ...filter,
        query,
        isResultsFiltersDisabled: true
      };
    }


    case ResultsActions.ActionTypes.CLEAR_FILTERS: {
      return initialState;
    }
  }

  return state;
}

export const getIsResultsFiltersDisabled = (state: FiltersState): boolean => state.isResultsFiltersDisabled;
