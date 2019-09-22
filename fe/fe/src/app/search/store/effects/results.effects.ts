import {Injectable} from '@angular/core';
import {SearchService} from '@app/search/services/search.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {merge, Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadSuccess} from '@app/search/store/actions/results.actions';
import {ResultListModel} from '@app/search/models/result.model';
import {SearchState} from '@app/search/store/reducers';
import {RequestsSelectors, ResultsSelectors} from '@app/search/store/selectors';
import {PostActions, RequestsActions, ResultsActions, ProfileActions, WebPageActions} from '@app/search/store/actions';
import {OpenDetails} from '@app/search/store/actions/post.actions';

@Injectable()
export class ResultsEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions,
    private store$: Store<SearchState>,
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

  @Effect({dispatch: false})
  openResultDetails$ = this.actions$
    .pipe(
      ofType(
        PostActions.ActionTypes.OPEN_DETAILS,
        ProfileActions.ActionTypes.OPEN_DETAILS,
        WebPageActions.ActionTypes.OPEN_DETAILS,
      ),
      map(({payload}: OpenDetails) => {
        const {result, route} = payload;
        this.router.navigate([result.contentType, result.index, result.documentId, 'general'], {
          relativeTo: route,
          queryParamsHandling: 'merge'
        });
      })
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
        PostActions.ActionTypes.LOAD_FAILURE,
        ResultsActions.ActionTypes.LOAD_DETAILS_FAILURE,
        RequestsActions.ActionTypes.SAVE_FAILURE,
      ),
      tap((action: any): any => console.log(`%c ERROR:<<<<< ${JSON.stringify(action.payload.error.message)} >>>>>`, 'color: red'))
    );
}
