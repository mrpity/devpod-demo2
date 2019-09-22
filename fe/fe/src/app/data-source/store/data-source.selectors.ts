import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { State } from './data-source.state';
import * as fromDataSource from './data-source.reducers';

export const selectDataSourceState =
  createFeatureSelector<State>('dataSource');

export const getDataSources = createSelector(
  selectDataSourceState,
  fromDataSource.getDataSources
);

export const getDataSourcesTotal = createSelector(
  selectDataSourceState,
  fromDataSource.getDataSourcesTotal
);

export const getListQuery = createSelector(
  selectDataSourceState,
  fromDataSource.getListQuery
);

export const getIsLoading = createSelector(
  selectDataSourceState,
  fromDataSource.getIsLoading
);

export const getFailedGateway = createSelector(
  selectDataSourceState,
  fromDataSource.getFailedGateway
);

export const getListStatuses = createSelector(
  selectDataSourceState,
  fromDataSource.getListStatuses
);

export const getAvailableProxyRegions = createSelector(
  selectDataSourceState,
  fromDataSource.getAvailableProxyRegions
);

export const getSelectedGeneralInfo = createSelector(
  selectDataSourceState,
  fromDataSource.getSelectedGeneralInfo
);

export const getSelectedStatistics = createSelector(
  selectDataSourceState,
  fromDataSource.getSelectedStatistics
);

export const getDetailsForEdit = createSelector(
  getSelectedGeneralInfo,
  getAvailableProxyRegions,
  (generalInfo, proxies) => ({ generalInfo, proxies })
);

export const getDocumentData = createSelector(
  selectDataSourceState,
  fromDataSource.getDocumentData
);

export const getDocumentInfo = createSelector(
  selectDataSourceState,
  fromDataSource.getDocumentInfo
);

export const getDocumentType = createSelector(
  getDocumentInfo,
  (info) => info && info.contentType
);

export const getIsDocumentCrawled = createSelector(
  selectDataSourceState,
  fromDataSource.getIsDocumentCrawled
);

export const getIsDocumentLoading = createSelector(
  selectDataSourceState,
  fromDataSource.getIsDocumentLoading
);

