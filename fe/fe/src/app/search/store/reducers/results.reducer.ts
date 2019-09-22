import { PostActions, ProfileActions, RequestsActions, ResultsActions, WebPageActions } from '@app/search/store/actions';
import { combineReducers } from '@ngrx/store';
import { Result, ResultsPagination } from '@app/search/models/result.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface ResultsEntityState extends EntityState<Result> { }

export interface ResultsState {
  results: ResultsEntityState;
  resultsTotal: number | undefined;
  selectedResultId: string | undefined;
  isResultsLoading: boolean;
  isResultsLoaded: boolean;
  isResultsLoadingFailure: boolean;
  isExternalResultsLoading: boolean;
  isExternalResultsFailed: boolean;
  searchListQuery: ResultsPagination;
  error: string | null;
}

export const adapterResults = createEntityAdapter<Result>();

export const resultsInitialState: ResultsEntityState = adapterResults.getInitialState({});

export const initialState: ResultsState = {
  results: resultsInitialState,
  resultsTotal: undefined,
  selectedResultId: undefined,
  isResultsLoading: false,
  isResultsLoaded: false,
  isResultsLoadingFailure: false,
  isExternalResultsLoading: false,
  isExternalResultsFailed: false,
  searchListQuery: {
    pageNumber: 0,
    pageSize: 20
  },
  error: null,
};


export function resultsReducer(
  state = initialState.results,
  action: ResultsActions.Actions | RequestsActions.Actions
): ResultsEntityState {
  switch (action.type) {
    case ResultsActions.ActionTypes.LOAD_SUCCESS: {
      return adapterResults.addAll(action.payload.items, state);
    }
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case RequestsActions.ActionTypes.EXTERNAL_REQUEST: {
      return initialState.results;
    }
    default: {
      return state;
    }
  }
}


export function resultsTotal(
  state = initialState.resultsTotal,
  action: ResultsActions.Actions | RequestsActions.Actions
): number {
  switch (action.type) {
    case ResultsActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemCount;
    }
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case RequestsActions.ActionTypes.EXTERNAL_REQUEST:
    case ResultsActions.ActionTypes.LOAD_FAILURE: {
      return initialState.resultsTotal;
    }
    default: {
      return state;
    }
  }
}

export function selectedResultId(
  state = initialState.selectedResultId,
  action: PostActions.Actions | RequestsActions.Actions | ResultsActions.Actions | ProfileActions.Actions | WebPageActions.Actions
): string {
  switch (action.type) {
    case PostActions.ActionTypes.OPEN_DETAILS:
    case ProfileActions.ActionTypes.OPEN_DETAILS:
    case WebPageActions.ActionTypes.OPEN_DETAILS: {
      return action.payload.result.id;
    }
    case ResultsActions.ActionTypes.CLOSE_DETAILS: {
      return initialState.selectedResultId;
    }
    default: {
      return state;
    }
  }
}

export function isResultsLoading(
  state = initialState.isResultsLoading,
  action: ResultsActions.Actions | RequestsActions.Actions
): boolean {
  switch (action.type) {
    case ResultsActions.ActionTypes.LOAD_REQUEST:
    case RequestsActions.ActionTypes.SAVE_REQUEST:
    case RequestsActions.ActionTypes.SELECT_REQUEST:
    case RequestsActions.ActionTypes.EXTERNAL_REQUEST: {
      return true;
    }
    case ResultsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.SAVE_SUCCESS:
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case ResultsActions.ActionTypes.LOAD_SUCCESS:
    case RequestsActions.ActionTypes.SAVE_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}


export function isResultsLoaded(
  state = initialState.isResultsLoaded,
  action: ResultsActions.Actions | RequestsActions.Actions
): boolean {
  switch (action.type) {
    case ResultsActions.ActionTypes.LOAD_REQUEST:
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case ResultsActions.ActionTypes.LOAD_FAILURE: {
      return false;
    }
    case ResultsActions.ActionTypes.LOAD_SUCCESS: {
      return true;
    }
    default: {
      return state;
    }
  }
}

export function isResultsLoadingFailure(
  state = initialState.isResultsLoadingFailure,
  action: ResultsActions.Actions | RequestsActions.Actions | PostActions.Actions
): boolean {
  switch (action.type) {
    case ResultsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.SAVE_FAILURE:
    case RequestsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.SELECT_FAILURE: {
      return true;
    }
    case ResultsActions.ActionTypes.LOAD_REQUEST:
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case ResultsActions.ActionTypes.LOAD_SUCCESS:
    case RequestsActions.ActionTypes.SELECT_REQUEST: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function isExternalResultsLoading(
  state = initialState.isExternalResultsLoading,
  action: ResultsActions.Actions | RequestsActions.Actions
): boolean {
  switch (action.type) {
    case RequestsActions.ActionTypes.EXTERNAL_REQUEST: {
      return true;
    }
    case ResultsActions.ActionTypes.LOAD_FAILURE:
    case ResultsActions.ActionTypes.CLEAR_FILTERS:

    case ResultsActions.ActionTypes.LOAD_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function searchListQuery(
  state = initialState.searchListQuery,
  action: ResultsActions.Actions | RequestsActions.Actions
): ResultsPagination {
  switch (action.type) {
    case ResultsActions.ActionTypes.CHANGE_PAGINATION: {
      return action.payload;
    }

    case ResultsActions.ActionTypes.CLEAR_PAGINATION:
    case ResultsActions.ActionTypes.CLEAR_LIST_QUERY_INPUT:

    case ResultsActions.ActionTypes.CLEAR_FILTERS: {
      return initialState.searchListQuery;
    }
    default: {
      return state;
    }
  }
}

export function error(
  state = initialState.error,
  action: ResultsActions.Actions | RequestsActions.Actions | PostActions.Actions
): any {
  switch (action.type) {
    case PostActions.ActionTypes.LOAD_SUCCESS:
    case ResultsActions.ActionTypes.LOAD_REQUEST:
    case RequestsActions.ActionTypes.SAVE_REQUEST:
    case RequestsActions.ActionTypes.SELECT_REQUEST:
    case RequestsActions.ActionTypes.EXTERNAL_REQUEST:
    case ResultsActions.ActionTypes.LOAD_SUCCESS:

    case ResultsActions.ActionTypes.CLEAR_FILTERS: {
      return null;
    }
    case PostActions.ActionTypes.LOAD_FAILURE:
    case ResultsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.SAVE_FAILURE:
    case RequestsActions.ActionTypes.SELECT_FAILURE:
    case RequestsActions.ActionTypes.LOAD_FAILURE: {
      return action.payload.error.message;
    }
    default: {
      return state;
    }
  }
}

export const reducer: any = combineReducers({
  results: resultsReducer,
  resultsTotal,
  selectedResultId,
  isResultsLoading,
  isResultsLoaded,
  isResultsLoadingFailure,
  isExternalResultsLoading,
  searchListQuery
});


export const getResults = (state: ResultsState): ResultsEntityState => state.results;
export const getResultsTotal = (state: ResultsState): number => state.resultsTotal;
export const getSelectedResultId = (state: ResultsState): string | undefined => state.selectedResultId;
export const getIsResultsLoading = (state: ResultsState): boolean => state.isResultsLoading;
export const getIsResultsLoaded = (state: ResultsState): boolean => state.isResultsLoaded;
export const getIsResultsLoadingFailure = (state: ResultsState): boolean => state.isResultsLoadingFailure;
export const getIsExternalResultsLoading = (state: ResultsState): boolean => state.isExternalResultsLoading;
export const getSearchListQuery = (state: ResultsState): ResultsPagination => state.searchListQuery;
export const getError = (state: ResultsState): string | null => state.error;
export const getIsSpinner = (state: ResultsState): boolean => {
  return (state.isResultsLoading || state.isExternalResultsLoading) && !state.isResultsLoadingFailure;
};

