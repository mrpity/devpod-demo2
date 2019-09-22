import {PostActions, RequestsActions, ResultsActions} from '@app/search/store/actions';
import {combineReducers} from '@ngrx/store';
import {OriginPagination} from '@app/search/models/post.model';
import {Result} from '@app/search/models/result.model';
import {PostOutput} from '@app/search/models/post.model';


export interface PostDetailsState {
  resultDetails?: PostOutput;
  origins: Result[];
  isOriginsLoading: boolean;
  isOriginsLoadingFailure: boolean;
  originListQuery:  OriginPagination;
  isPostGeneralLoading: boolean;
}


export const initialState: PostDetailsState = {
  resultDetails: undefined,
  origins: [],
  isOriginsLoading: false,
  isOriginsLoadingFailure: false,
  originListQuery: {
    pageNumber: 0,
    pageSize: 20
  },
  isPostGeneralLoading: false,
};



export function resultDetails (
  state = initialState.resultDetails,
  action: PostActions.Actions
): PostOutput {
  switch (action.type) {
    case PostActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload;
    }
    case PostActions.ActionTypes.OPEN_DETAILS:
    case PostActions.ActionTypes.OPEN_ORIGIN_DETAILS: {
      return initialState.resultDetails;
    }
    default: {
      return state;
    }
  }
}

export function origins (
  state = initialState.origins,
  action: ResultsActions.Actions | PostActions.Actions
): Result[] {
  switch (action.type) {
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS_SUCCESS: {
      return action.payload;
    }
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS:
    case ResultsActions.ActionTypes.CLOSE_DETAILS: {
      return initialState.origins;
    }
    default: {
      return state;
    }
  }
}

export function isOriginsLoading (
  state = initialState.isOriginsLoading,
  action: ResultsActions.Actions | PostActions.Actions
): boolean {
  switch (action.type) {
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS: {
      return true;
    }
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS_SUCCESS: {
      return initialState.isOriginsLoading;
    }
    default: {
      return state;
    }
  }
}

export function isOriginsLoadingFailure (
  state = initialState.isOriginsLoadingFailure,
  action: PostActions.Actions
): boolean {
  switch (action.type) {
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS_FAILURE: {
      return true;
    }
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS_SUCCESS:
    case PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS: {
      return initialState.isOriginsLoadingFailure;
    }
    default: {
      return state;
    }
  }
}

export function originListQuery (
  state = initialState.originListQuery,
  action: ResultsActions.Actions | RequestsActions.Actions | PostActions.Actions
): OriginPagination {
  switch (action.type) {
    case PostActions.ActionTypes.CHANGE_PAGINATION: {
      return {
        ...state,
        ...action.payload
      };
    }
    case PostActions.ActionTypes.CLEAR_PAGINATION: {
      return initialState.originListQuery;
    }
    default: {
      return state;
    }
  }
}

export function isPostGeneralLoading (
  state = initialState.isPostGeneralLoading,
  action: ResultsActions.Actions | PostActions.Actions
): boolean {
  switch (action.type) {
    case PostActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case PostActions.ActionTypes.LOAD_SUCCESS:
    case PostActions.ActionTypes.LOAD_FAILURE: {
      return initialState.isOriginsLoading;
    }
    default: {
      return state;
    }
  }
}

export const reducer: any = combineReducers({
  resultDetails,
  origins,
  isOriginsLoading,
  isOriginsLoadingFailure,
  originListQuery,
  isPostGeneralLoading
});

export const getResultDetails = (state: PostDetailsState): PostOutput => state.resultDetails;
export const getOrigins = (state: PostDetailsState): Result[] => {
  console.log(state.origins);
  return state.origins;
};
export const getIsOriginsLoading = (state: PostDetailsState): boolean => state.isOriginsLoading;
export const getIsOriginsLoadingFailure = (state: PostDetailsState): boolean => state.isOriginsLoadingFailure;
export const getOriginListQuery = (state: PostDetailsState): OriginPagination => state.originListQuery;
export const getIsPostGeneralLoading = (state: PostDetailsState): boolean => state.isPostGeneralLoading;
