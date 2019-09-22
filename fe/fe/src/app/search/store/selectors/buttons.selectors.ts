import {createSelector} from '@ngrx/store';
import {getSelectedRequest} from '@app/search/store/selectors/requests.selectors';
import {getIsResultsLoaded, getIsResultsLoading} from '@app/search/store/selectors/results.selectors';
import {ExternalStatusService} from '@app/search/services/external-status.service';
import {ExternalSearchStatus} from '@app/search/models/request.model';


export const getIsGetNewBtn = createSelector(
  getSelectedRequest,
  getIsResultsLoaded,
  getIsResultsLoading,
  (request, isLoaded, isLoading) =>
    request
    && (!request.externalSearch || externalServiceObject.isFinished(request.externalSearch.status))
    && (isLoaded || isLoading)
);


export const getIsGetNewBtnDisabled = createSelector(
  getSelectedRequest,
  getIsResultsLoaded,
  getIsResultsLoading,
  (request, isLoaded, isLoading) => {
    return Boolean(isLoading || request && request.externalSearch);
  }
);


export const getIsSearchBtn = createSelector(
  getSelectedRequest,
  getIsResultsLoaded,
  getIsResultsLoading,
  getIsGetNewBtn,
  (selectedRequest) =>
    Boolean(!selectedRequest)
);


export const getIsCancelBtn = createSelector(
  getSelectedRequest,
  (selectedRequest) =>
    selectedRequest
    && selectedRequest.externalSearch
    && externalServiceObject.isCancelled(selectedRequest.externalSearch.status)
);

export const getIsCancelBtnDisabled = createSelector(
  getSelectedRequest,
  (selectedRequest) =>
    selectedRequest
    && selectedRequest.externalSearch
    && selectedRequest.externalSearch.status === ExternalSearchStatus.CANCELLED
);


export const getButtonsData = createSelector(
  getIsGetNewBtn,
  getIsGetNewBtnDisabled,
  getIsSearchBtn,
  getIsCancelBtn,
  getIsCancelBtnDisabled,
  (getNewBtn, isGetNewBtnDisabled, isSearchBtn, isCancelBtn, isCancelBtnDisabled) => {
    return {isGetNewBtn: getNewBtn, isGetNewBtnDisabled, isSearchBtn, isCancelBtn, isCancelBtnDisabled};
  });

const externalServiceObject = new ExternalStatusService();
