import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {
  GetRequestOutput,
} from '@app/search/models/request.model';
import {RequestsActions, ResultsActions } from '@app/search/store/actions';
import {combineReducers} from '@ngrx/store';
import {RequestListItem} from '@app/search/models/request.model';


interface RequestsEntityState extends EntityState<RequestListItem> {}

export interface RequestsState {
  requests: RequestsEntityState;
  requestsTotal: number;
  selectedRequestId: number | undefined;
  selectedRequest: GetRequestOutput;
  isRequestsLoading: boolean;
  isRequestsLoaded: boolean;
}

export const adapterRequests = createEntityAdapter<RequestListItem>();

export const requestsInitialState: RequestsEntityState = adapterRequests.getInitialState({});


export const initialState: RequestsState = {
  requests: requestsInitialState,
  requestsTotal: 0,
  selectedRequestId: undefined,
  selectedRequest: undefined,
  isRequestsLoading: false,
  isRequestsLoaded: false
};



export function requests (
  state = requestsInitialState,
  action: RequestsActions.Actions | ResultsActions.Actions
): RequestsEntityState {
  switch (action.type) {
    case RequestsActions.ActionTypes.LOAD_SUCCESS: {
      return adapterRequests.addAll(action.payload.items, state);
    }
    case RequestsActions.ActionTypes.EXTERNAL_SUCCESS: {
      const {id, externalSearch} = action.payload;
      const entities = {...state.entities};
      let changes;
      if (entities[id]) {
        changes = {
          externalSearch
        };
      }
      return adapterRequests.updateOne({
        id,
      changes
      }, state);
    }
    case RequestsActions.ActionTypes.SSE_EXTERNAL_COMPLETED: {
      const {id, status, countToProcess} = action.payload;
      const entities = {...state.entities};
      const original = entities[id];
      let changes;
      if (original && original.externalSearch) {
        changes = {
          externalSearch: {...original.externalSearch, status, countToProcess}
        };
      }
      return adapterRequests.updateOne({
        id,
        changes
      }, state);
    }
    default: {
      return state;
    }
  }
}


export function requestsTotal (
  state = initialState.requestsTotal,
  action: RequestsActions.Actions | ResultsActions.Actions
): number {
  switch (action.type) {
    case RequestsActions.ActionTypes.LOAD_REQUEST:
    case RequestsActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case RequestsActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemCount;
    }
    default: {
      return state;
    }
  }
}

export function selectedRequestId (
  state = initialState.selectedRequestId,
  action: RequestsActions.Actions | ResultsActions.Actions
): number {
    switch (action.type) {
      case RequestsActions.ActionTypes.SELECT_SUCCESS: {
        return action.payload.id;
      }

      case ResultsActions.ActionTypes.CLEAR_FILTERS: {
        return initialState.selectedRequestId;
      }
      default: {
        return state;
      }
    }
}

export function selectedRequest (
  state = initialState.selectedRequest,
  action: RequestsActions.Actions | ResultsActions.Actions
): GetRequestOutput {
  switch (action.type) {
    case RequestsActions.ActionTypes.EXTERNAL_SUCCESS:
    case RequestsActions.ActionTypes.SELECT_SUCCESS: {
      return action.payload;
    }
    case RequestsActions.ActionTypes.SSE_EXTERNAL_COMPLETED: {
      const {id, status, countToProcess} = action.payload;
      if (state && id === state.id) {
        const original = {...state};
        original.externalSearch.status = status;
        original.externalSearch.countToProcess = countToProcess;
        return original;
      }
      return state;
    }
    case RequestsActions.ActionTypes.CANCEL_SUCCESS: {
      const {externalSearch} = action.payload;
      return {
        ...state,
        externalSearch
      };
    }
    case ResultsActions.ActionTypes.CLEAR_FILTERS: {
      return initialState.selectedRequest;
    }
    default: {
      return state;
    }
  }
}

export function isRequestsLoading (
  state = initialState.isRequestsLoading,
  action: RequestsActions.Actions | ResultsActions.Actions
): boolean {
  switch (action.type) {
    case RequestsActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case RequestsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.LOAD_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function isRequestsLoaded (
  state = initialState.isRequestsLoaded,
  action: RequestsActions.Actions | ResultsActions.Actions
): boolean {
  switch (action.type) {
    case RequestsActions.ActionTypes.LOAD_SUCCESS: {
      return true;
    }
    case RequestsActions.ActionTypes.LOAD_FAILURE:
    case RequestsActions.ActionTypes.LOAD_REQUEST:
    case RequestsActions.ActionTypes.CHANGE_PAGINATION:
    case RequestsActions.ActionTypes.SAVE_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export const reducer: any = combineReducers({
  requests,
  selectedRequestId,
  selectedRequest,
  requestsTotal,
  isRequestsLoading,
  isRequestsLoaded
});


export const getRequests = (state: RequestsState): RequestsEntityState => state.requests;
export const getSelectedRequestId = (state: RequestsState): number => state.selectedRequestId;
export const getSearchRequestsTotal = (state: RequestsState): number => state.requestsTotal;
export const getIsRequestsLoading = (state: RequestsState): boolean => state.isRequestsLoading;
export const getIsRequestsLoaded = (state: RequestsState): boolean => state.isRequestsLoaded;
export const getSelectedRequest = (state: RequestsState): GetRequestOutput => state.selectedRequest;
export const getRequestsData = (state: RequestsState): object => ({
  requestsTotal: state.requestsTotal,
  selectedRequestId: state.selectedRequestId,
});
