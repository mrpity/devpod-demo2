import { ResultsActions, WebPageActions } from '@app/search/store/actions';
import { combineReducers } from '@ngrx/store';
import { WebPageOutput } from '@app/search/models/webpage.model';


export interface WebPageState {
  resultDetails?: WebPageOutput;
  isLoading: boolean;
}

export const initialState: WebPageState = {
  resultDetails: undefined,
  isLoading: false
};

export function resultDetails(
  state = initialState.resultDetails,
  action: WebPageActions.Actions
): WebPageOutput {
  switch (action.type) {
    case WebPageActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload;
    }
    case WebPageActions.ActionTypes.OPEN_DETAILS: {
      return initialState.resultDetails;
    }
    default: {
      return state;
    }
  }
}

export function isLoading(
  state = initialState.isLoading,
  action: ResultsActions.Actions | WebPageActions.Actions
): boolean {
  switch (action.type) {
    case WebPageActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case WebPageActions.ActionTypes.LOAD_SUCCESS:
    case WebPageActions.ActionTypes.LOAD_FAILURE: {
      return initialState.isLoading;
    }
    default: {
      return state;
    }
  }
}

export const reducer: any = combineReducers({
  resultDetails,
  isLoading
});

export const getResultDetails = (state: WebPageState): WebPageOutput => state.resultDetails;
export const getIsLoading = (state: WebPageState): boolean => state.isLoading;
