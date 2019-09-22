import { PostActions, RequestsActions, ResultsActions, ProfileActions } from '@app/search/store/actions';
import { combineReducers } from '@ngrx/store';
import { Result } from '@app/search/models/result.model';
import { ProfileOutput } from '@app/search/models/profile.model';


export interface ProfileState {
  resultDetails?: ProfileOutput;
  friends: any[];
  isLoading: boolean;
}

export const initialState: ProfileState = {
  resultDetails: undefined,
  friends: [],
  isLoading: false
};

export function resultDetails(
  state = initialState.resultDetails,
  action: ProfileActions.Actions
): ProfileOutput {
  switch (action.type) {
    case ProfileActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload;
    }
    case ProfileActions.ActionTypes.LOAD_PHOTO_SUCCESS: {
      return {
        ...state,
        profilePicBase64: action.payload
      };
    }
    case ProfileActions.ActionTypes.OPEN_DETAILS: {
      return initialState.resultDetails;
    }
    default: {
      return state;
    }
  }
}

export function friends(
  state = initialState.friends,
  action: ResultsActions.Actions | ProfileActions.Actions
): any[] {
  switch (action.type) {
    case ProfileActions.ActionTypes.CLOSE_DETAILS: {
      return initialState.friends;
    }
    default: {
      return state;
    }
  }
}

export function isLoading(
  state = initialState.isLoading,
  action: ResultsActions.Actions | ProfileActions.Actions
): boolean {
  switch (action.type) {
    case ProfileActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case ProfileActions.ActionTypes.LOAD_SUCCESS:
    case ProfileActions.ActionTypes.LOAD_FAILURE: {
      return initialState.isLoading;
    }
    default: {
      return state;
    }
  }
}

export const reducer: any = combineReducers({
  resultDetails,
  friends,
  isLoading
});

export const getResultDetails = (state: ProfileState): ProfileOutput => state.resultDetails;
export const getFriends = (state: ProfileState): Result[] => state.friends;
export const getIsLoading = (state: ProfileState): boolean => state.isLoading;
