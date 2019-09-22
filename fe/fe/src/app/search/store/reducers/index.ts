import { ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromRequests from './requests.reducer';
import * as fromResults from './results.reducer';
import * as fromFilters from './filters.reducer';
import * as fromPosts from './posts.reducer';
import * as fromProfile from './profile.reducer';
import * as fromWebPage from './webpage.reducer';
import { InjectionToken } from '@angular/core';


export interface SearchState {
  requests: fromRequests.RequestsState;
  results: fromResults.ResultsState;
  filters: fromFilters.FiltersState;
  posts: fromPosts.PostDetailsState;
  profile: fromProfile.ProfileState;
  webpage: fromWebPage.WebPageState;
}

export const reducers = combineReducers({
  requests: fromRequests.reducer,
  results: fromResults.reducer,
  filters: fromFilters.reducer,
  posts: fromPosts.reducer,
  profile: fromProfile.reducer,
  webpage: fromWebPage.reducer,
});

export const reducersToken = new InjectionToken<ActionReducerMap<SearchState>>('SearchReducers');

export const getSearchState = createFeatureSelector<SearchState>('search');
