import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';


import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@app/shared/utils';

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

// TODO: Implement Global Error handling
// TODO: Use MemoizedSelector

// import { createSelector, MemoizedSelector } from '@ngrx/store';
// import { AvatarStoreSelectors } from '../avatar/store/avatar.selectors';

// export const selectError: MemoizedSelector<object, string> = createSelector(
//   AvatarStoreSelectors.getErrors,
//   (error: string) => {
//     return error;
//   }
// );

// export const selectIsLoading: MemoizedSelector<
//   object,
//   boolean
// > = createSelector(
//   AvatarStoreSelectors.getIsLoading,
//   (isLoading: boolean) => {
//     return isLoading;
//   }
// );


export const getRouterInfo = createSelector(
  getRouterState,
  state => state && state.state
);

export const getRouterUrl = createSelector(
  getRouterState,
  state => state && state.state.url
);

export const getRouterQueryParams = createSelector(
  getRouterState,
  state => state && state.state.queryParams
);

export const getRouterParams = createSelector(
  getRouterState,
  state => state && state.state.params
);
