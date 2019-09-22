import {createSelector} from '@ngrx/store';
import * as fromRequests from '@app/search/store/reducers/requests.reducer';
import {getSearchState} from '@app/search/store/reducers';
import {requestsQuery} from '@app/search/models/request.model';


export const getRequestsState = createSelector(
  getSearchState,
  state => state.requests
);

export const getRequests = createSelector(
  getRequestsState,
  fromRequests.getRequests
);

export const {
  selectAll: selectAllRequests,
  selectEntities: selectEntitiesRequests,
  selectIds: selectRequestIds,
  selectTotal: selectRequestsTotal
} = fromRequests.adapterRequests.getSelectors(getRequests);


export const getSearchRequestsTotal = createSelector(
  getRequestsState,
  fromRequests.getSearchRequestsTotal
);

export const getSelectedRequestId = createSelector(
  getRequestsState,
  fromRequests.getSelectedRequestId
);

export const getIsRequestsLoading = createSelector(
  getRequestsState,
  fromRequests.getIsRequestsLoading
);

export const getIsRequestsLoaded = createSelector(
  getRequestsState,
  fromRequests.getIsRequestsLoaded
);


export const getSelectedRequest = createSelector(
  getRequestsState,
  fromRequests.getSelectedRequest
);

export const getRequestById = (id) => createSelector(
  selectEntitiesRequests,
  (requests) => {
    return requests && requests[id];
  }
);

export const getRequestsData = createSelector(
  getRequestsState,
  fromRequests.getRequestsData
);

export const getTotalPages = createSelector(
  getSearchRequestsTotal,
  (total) => {
    const rem = total % requestsQuery.pageSize;
    const rounded = Math.floor(total / requestsQuery.pageSize);
    return rem ? rounded + 1 : rounded;
  }
);




