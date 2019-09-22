import { createSelector } from '@ngrx/store';
import * as fromRequests from '@app/analytic/store/reducers/analytic-requests.reducer';
import { getAnalyticState } from '@app/analytic/store/reducers';
import { requestsQuery } from '@app/analytic/models/analytic-request.model';


export const getRequestsState = createSelector(
  getAnalyticState,
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


export const getAnalyticRequestsTotal = createSelector(
  getRequestsState,
  fromRequests.getAnalyticRequestsTotal
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
  getAnalyticRequestsTotal,
  (total) => {
    const rem = total % requestsQuery.pageSize;
    const rounded = Math.floor(total / requestsQuery.pageSize);
    return rem ? rounded + 1 : rounded;
  }
);




