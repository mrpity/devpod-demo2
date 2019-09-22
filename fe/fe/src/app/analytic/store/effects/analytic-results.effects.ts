import { Injectable } from '@angular/core';
import { AnalyticService } from '@app/analytic/services/analytic.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadSuccess } from '@app/analytic/store/actions/results.actions';
import { ResultListModel } from '@app/analytic/models/analytic-result.model';
import { AnalyticState } from '@app/analytic/store/reducers';
import { RequestsSelectors, ResultsSelectors } from '@app/analytic/store/selectors';
import { RequestsActions, ResultsActions } from '@app/analytic/store/actions';

@Injectable()
export class AnalyticResultsEffects {
  constructor(
    private dataService: AnalyticService,
    private actions$: Actions,
    private store$: Store<AnalyticState>,
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  clearFilters$ = this.actions$.pipe(ofType(ResultsActions.ActionTypes.CLEAR_FILTERS));
  refreshResults$ = this.actions$.pipe(ofType(ResultsActions.ActionTypes.REFRESH_RESULTS));
  cancelRequest$ = this.actions$.pipe(ofType(RequestsActions.ActionTypes.CANCEL_REQUEST));

  /**
   * Change results pagination
   */
  @Effect()
  changePaginationEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ResultsActions.ActionTypes.CHANGE_PAGINATION,
      ),
      withLatestFrom(this.store$.select(RequestsSelectors.getSelectedRequestId)),
      map(([action, id]) => new ResultsActions.RefreshResults(id))
    );

  /**
   * Refresh results effect
   */
  @Effect()
  refreshSearchResults$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ResultsActions.ActionTypes.REFRESH_RESULTS,
      ),
      withLatestFrom(
        this.store$.select(ResultsSelectors.getSearchListQuery)
      ),
      switchMap(([action, searchListQuery]: any) => {
        this.store$.dispatch(new ResultsActions.LoadRequest());
        const id = action.payload;
        return this.dataService
          .updateResultList({...searchListQuery, id})
          .pipe(
            takeUntil(merge(this.clearFilters$, this.refreshResults$, this.cancelRequest$)),
            map((data: ResultListModel): LoadSuccess => {
                return new ResultsActions.LoadSuccess({
                  ...data
                });
              }
            ),
            catchError(error => {
                return of(new ResultsActions.LoadFailure({error}));
              }
            )
          );
      }),
    );

  /**
   * Log errors effect
   */
  @Effect({dispatch: false})
  loadResultsFailureEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ResultsActions.ActionTypes.LOAD_FAILURE,
        RequestsActions.ActionTypes.LOAD_FAILURE,
        RequestsActions.ActionTypes.SELECT_FAILURE,
        ResultsActions.ActionTypes.LOAD_DETAILS_FAILURE,
        RequestsActions.ActionTypes.SAVE_FAILURE,
      ),
      tap((action: any): any => console.log(`%c ERROR:<<<<< ${JSON.stringify(action.payload.error.message)} >>>>>`, 'color: red'))
    );
}
