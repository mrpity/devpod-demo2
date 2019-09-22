import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { initialState, State } from './data-source.state';
import { DataSourceListActions, DataSourceCrudActions, DataSourceDetailsActions } from './actions';
import { InjectionToken } from '@angular/core';
import { SourceData, DataSourceListStatuses, DataSourceListQuery, DataSource } from '../models/data-source.model';
import {
  DataSourceDetailInterface,
  ProxyRegionInterface,
  DataSourceStatisticOutput,
  DocumentDataType, DocumentInfoOutput
} from '../models/data-source-crud.model';
import { ProfileActions } from '@app/search/store/actions';

export function dataSources(
  state = initialState.dataSources,
  action: DataSourceListActions.Actions
): DataSource[] {
  switch (action.type) {
    case DataSourceListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.dataSources.map((item) => {
        const { status, ...dataSource } = item; // delete status property
        return dataSource;
      });
    }
    case DataSourceListActions.ActionTypes.DATASOURCE_UPDATED_SSE: {
      const newState = JSON.parse(JSON.stringify(state));
      return newState.map((dataSource: SourceData) => {
        if (dataSource.id === action.payload.datasourceId) {
          dataSource.status = action.payload.status;
          dataSource.crawledAt = action.payload.crawledAt;
        }
        return dataSource;
      });
    }
    case DataSourceListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function listStatuses(
  state = initialState.listStatuses,
  action: DataSourceListActions.Actions
): DataSourceListStatuses {
  switch (action.type) {
    case DataSourceListActions.ActionTypes.LOAD_SUCCESS: {
      const listStatusesObj: DataSourceListStatuses = {};
      action.payload.dataSources.forEach((item) => {
        listStatusesObj[item.id] = item.status;
      });
      return listStatusesObj;
    }
    case DataSourceListActions.ActionTypes.DATASOURCE_UPDATED_SSE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState[action.payload.datasourceId] = action.payload.status;
      return newState;
    }
    case DataSourceListActions.ActionTypes.LIST_STATUSES__SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }

  }
}

export function dataSourcesTotal(
  state = initialState.dataSourcesTotal,
  action: DataSourceListActions.Actions
): number {
  switch (action.type) {
    case DataSourceListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemCount;
    }
    case DataSourceListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function listQuery(
  state = initialState.listQuery,
  action: DataSourceListActions.Actions
): DataSourceListQuery {
  switch (action.type) {
    case DataSourceListActions.ActionTypes.CHANGE_PAGINATION:
    case DataSourceListActions.ActionTypes.CHANGE_FILTER:
    case DataSourceListActions.ActionTypes.CHANGE_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case DataSourceListActions.ActionTypes.CLEAR_LIST_QUERY: {
      return initialState.listQuery;
    }
    default: {
      return state;
    }
  }
}

export function isLoading(
  state = initialState.isLoading,
  action: DataSourceListActions.Actions
): boolean {
  switch (action.type) {
    case DataSourceListActions.ActionTypes.LOAD_REQUEST: {
      return true;
    }
    case DataSourceListActions.ActionTypes.LOAD_FAILURE:
    case DataSourceListActions.ActionTypes.LOAD_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function selectedGeneralInfo(
  state = initialState.selectedGeneralInfo,
  action: DataSourceCrudActions.Actions | DataSourceDetailsActions.Actions
): DataSourceDetailInterface {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_SUCCESS: {
      return action.payload;
    }
    case DataSourceCrudActions.ActionTypes.CHANGE_STATE_REQUEST: {
      return {
        ...state,
        enabled: action.payload.enabled
      };
    }
    case DataSourceDetailsActions.ActionTypes.CLEAR_SELECTED_DATA_SOURCE: {
      return initialState.selectedGeneralInfo;
    }
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_REQUEST:
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_FAILURE:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_REQUEST:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_FAILURE:
    default: {
      return state;
    }
  }
}

export function selectedStatistics(
  state = initialState.selectedStatistics,
  action: DataSourceCrudActions.Actions | DataSourceDetailsActions.Actions
): DataSourceStatisticOutput {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.LOAD_STATISTICS_SUCCESS: {
      return action.payload;
    }
    case DataSourceDetailsActions.ActionTypes.CLEAR_SELECTED_DATA_SOURCE: {
      return initialState.selectedStatistics;
    }
    case DataSourceDetailsActions.ActionTypes.LOAD_STATISTICS_REQUEST:
    case DataSourceDetailsActions.ActionTypes.LOAD_STATISTICS_FAILURE:
    default: {
      return state;
    }
  }
}

export function availableProxyRegions(
  state = initialState.availableProxyRegions,
  action: DataSourceCrudActions.Actions | DataSourceDetailsActions.Actions
): ProxyRegionInterface[] {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_SUCCESS: {
      return action.payload;
    }
    case DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_REQUEST:
    case DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_FAILURE:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_REQUEST:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_FAILURE:
    default: {
      return state;
    }
  }
}

export function failedGateway(
  state = initialState.failedGateway,
  action: DataSourceCrudActions.Actions | DataSourceDetailsActions.Actions
): boolean {
  switch (action.type) {
    case DataSourceCrudActions.ActionTypes.UPDATE_FAILURE:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_FAILURE:
    case DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_FAILURE:
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_FAILURE:
    case DataSourceCrudActions.ActionTypes.CREATE_NEW_FAILURE:
    case DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_FAILURE: {
      return true;
    }

    case DataSourceCrudActions.ActionTypes.UPDATE_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_SUCCESS:
    case DataSourceCrudActions.ActionTypes.CREATE_NEW_SUCCESS:
    case DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.CLEAR_SELECTED_DATA_SOURCE: {
      return false;
    }

    default: {
      return state;
    }
  }
}

export function documentData(
  state = initialState.documentData,
  action: DataSourceDetailsActions.Actions | ProfileActions.Actions
): DocumentDataType {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_SUCCESS: {
      return action.payload;
    }
    case ProfileActions.ActionTypes.LOAD_PHOTO_SUCCESS: {
      return {
        ...state,
        profilePicBase64: action.payload
      };
    }
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_FAILURE:
    case DataSourceDetailsActions.ActionTypes.CLEAR_SELECTED_DATA_SOURCE: {
      return initialState.documentData;
    }
    default: {
      return state;
    }
  }
}

export function documentInfo(
  state = initialState.documentInfo,
  action: DataSourceDetailsActions.Actions
): DocumentInfoOutput {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_SUCCESS: {
      return action.payload;
    }
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_SUCCESS: {
      const {index, documentId, contentType} = action.payload;
      return {index, documentId, contentType};
    }
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_FAILURE:
    case DataSourceDetailsActions.ActionTypes.CLEAR_SELECTED_DATA_SOURCE: {
      return initialState.documentInfo;
    }
    default: {
      return state;
    }
  }
}

export function isDocumentCrawled(
  state = initialState.isDocumentCrawled,
  action: DataSourceDetailsActions.Actions
): boolean {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.LOAD_GENERAL_INFO_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_SUCCESS: {
      const {documentId} = action.payload;
      return !!documentId;
    }
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_FAILURE:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_FAILURE: {
      return false;
    }
    case DataSourceDetailsActions.ActionTypes.CHANGE_TAB:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_REQUEST: {
      return initialState.isDocumentCrawled;
    }
    default: {
      return state;
    }
  }
}

export function isDocumentLoading(
  state = initialState.isDocumentCrawled,
  action: DataSourceDetailsActions.Actions
): boolean {
  switch (action.type) {
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_REQUEST:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_REQUEST: {
      return true;
    }
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_SUCCESS:
    case DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_FAILURE: {
      return initialState.isDocumentLoading;
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({
  dataSources,
  dataSourcesTotal,
  listQuery,
  isLoading,
  listStatuses,
  selectedGeneralInfo,
  selectedStatistics,
  availableProxyRegions,
  failedGateway,
  documentData,
  documentInfo,
  isDocumentCrawled,
  isDocumentLoading
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('DataSourceReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const getDataSources = (state: State): DataSource[] => state.dataSources;
export const getListQuery = (state: State): DataSourceListQuery => state.listQuery;
export const getDataSourcesTotal = (state: State): number => state.dataSourcesTotal;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getFailedGateway = (state: State): boolean => state.failedGateway;
export const getListStatuses = (state: State): DataSourceListStatuses => state.listStatuses;
export const getSelectedGeneralInfo = (state: State): DataSourceDetailInterface => state.selectedGeneralInfo;
export const getSelectedStatistics = (state: State): DataSourceStatisticOutput => state.selectedStatistics;
export const getAvailableProxyRegions = (state: State): ProxyRegionInterface[] => state.availableProxyRegions;
export const getDocumentData = (state: State): DocumentDataType => state.documentData;
export const getDocumentInfo = (state: State): DocumentInfoOutput => state.documentInfo;
export const getIsDocumentCrawled = (state: State): boolean => state.isDocumentCrawled;
export const getIsDocumentLoading = (state: State): boolean => state.isDocumentLoading;
