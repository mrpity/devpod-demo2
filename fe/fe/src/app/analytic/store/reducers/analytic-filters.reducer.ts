import { RequestsActions, ResultsActions } from '@app/analytic/store/actions';
import { ResourceTypesEnum } from '@app/analytic/models/analytic-request.model';
import { ResultTypesEnum, ScaleEnum } from '@app/analytic/models/analytic-result.model';

export interface FiltersState {
  query: string;
  scale: ScaleEnum;
  toDate: string;
  fromDate: string;
  zoneOffset: string;
  isResultsFiltersDisabled: boolean;
}

export const initialState: FiltersState = {
  query: '',
  scale: undefined,
  toDate: '',
  fromDate: '',
  zoneOffset: '',
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
      const {query, zoneOffset, filter} = action.payload;
      return {
        ...state,
        ...filter,
        query,
        zoneOffset,
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
