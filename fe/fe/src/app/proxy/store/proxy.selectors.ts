import {
  createFeatureSelector,
  createSelector,
  // MemoizedSelector
} from '@ngrx/store';

import { State } from './proxy.state';
import * as fromProxy from './proxy.reducers';

export const selectProxyState =
  createFeatureSelector<State>('proxy');

export const getProxies = createSelector(
  selectProxyState,
  fromProxy.getProxies
);

export const getCountries = createSelector(
  selectProxyState,
  fromProxy.getCountries
);

export const getTypes = createSelector(
  selectProxyState,
  fromProxy.getTypes
);

export const getProxiesTotal = createSelector(
  selectProxyState,
  fromProxy.getProxiesTotal
);

export const getListQuery = createSelector(
  selectProxyState,
  fromProxy.getListQuery
);

export const getError = createSelector(
  selectProxyState,
  fromProxy.getError
);

export const getIsLoading = createSelector(
  selectProxyState,
  fromProxy.getIsLoading
);

export const getSelected = createSelector(
  selectProxyState,
  fromProxy.getSelected
);

export const getSortBy = createSelector(
  selectProxyState,
  fromProxy.getSortBy
);

export const getIsAddBtnDisabled = createSelector(
  selectProxyState,
  fromProxy.getIsAddBtnDisabled
);

export const getClearSelected = createSelector(
  selectProxyState,
  fromProxy.getClearSelected
);

export const getSelectedProxies = createSelector(
  selectProxyState,
  fromProxy.getSelectedProxies
);

export const getSelectedDetails = createSelector(
  selectProxyState,
  fromProxy.getSelectedDetails
);
