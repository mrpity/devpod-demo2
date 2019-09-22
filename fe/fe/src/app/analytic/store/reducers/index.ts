import { ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromRequests from './analytic-requests.reducer';
import * as fromResults from './analytic-results.reducer';
import * as fromFilters from './analytic-filters.reducer';
import { InjectionToken } from '@angular/core';


export interface AnalyticState {
  requests: fromRequests.RequestsState;
  results: fromResults.ResultsState;
  filters: fromFilters.FiltersState;
}

export const reducers = combineReducers({
  requests: fromRequests.reducer,
  results: fromResults.reducer,
  filters: fromFilters.reducer,
});

export const reducersToken = new InjectionToken<ActionReducerMap<AnalyticState>>('SearchReducers');

export const getAnalyticState = createFeatureSelector<AnalyticState>('analytic');
