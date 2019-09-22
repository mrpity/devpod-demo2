import { Injectable } from '@angular/core';
import { SearchService } from '@app/search/services/search.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { merge, Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {
  ExternalSearchStatus,
  GetRequestOutput,
  RequestListItem,
  requestsQuery,
  SearchRequestListQueryOutput
} from '@app/search/models/request.model';
import { mapToParam, ofRoute } from '@app/store/operators/route.operator';
import { SearchState } from '@app/search/store/reducers';
import { RequestsActions, ResultsActions } from '@app/search/store/actions';
import { RequestsSelectors } from '@app/search/store/selectors';
import { ExternalError, ExternalSuccess, SelectRequest } from '@app/search/store/actions/requests.actions';
import { Router } from '@angular/router';
import { getRouterQueryParams } from '@app/store/app.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { SnackBarSearchRequestComponent } from '@app/search/components/snack-bar-search-request/snack-bar-search-request.component';
import { AnalyticExternalStatusService } from '@app/analytic/services/analytic-external-status.service';

@Injectable()
export class RequestsEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions,
    private store$: Store<SearchState>,
    public router: Router,
    private dialog: MatDialog
  ) {}
  clearFilters$ = this.actions$.pipe(ofType(ResultsActions.ActionTypes.CLEAR_FILTERS));
  selectRequest$ = this.actions$.pipe(ofType(RequestsActions.ActionTypes.SELECT_REQUEST));
  cancelRequest$ = this.actions$.pipe(ofType(RequestsActions.ActionTypes.CANCEL_REQUEST));

  /** Shows value of "countToProcess" on which we should refresh results,
   * updates on every REQUEST_STEP iteration */
  updateResults = this.queryResultsEvery(5);

  /** Saves search request (with all filters) in request history */
  @Effect()
  saveRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.SAVE_REQUEST,
      ),
      switchMap((action: any) => {
        return this.dataService
          .saveSearchRequest(action.payload)
          .pipe(
            map((data) => {
                return new RequestsActions.SaveSuccess(data);
              }
            ),
            catchError(error => {
                return of(new RequestsActions.SaveFailure({error}));
              }
            )
          );
      })
    );

  /** After successful save navigate to results page */
  @Effect({dispatch: false})
  saveSuccess$ = this.actions$.pipe(
    ofType(
      RequestsActions.ActionTypes.SAVE_SUCCESS,
    ),
    map((action: any) => {
      this.router.navigate([`/app/search/${action.payload.id}/results`], {
        queryParams: {reqPage: requestsQuery.pageNumber},
        queryParamsHandling: 'merge'
      });
    })
  );

  /** Change pagination */
  @Effect({dispatch: false})
  paginationEffect$ = this.actions$.pipe(
    ofType(
      RequestsActions.ActionTypes.CHANGE_PAGINATION,
    ),
    tap((action: RequestsActions.ChangePagination) =>
      this.router.navigate([], {
        queryParams: {reqPage: action.payload.pageNumber},
        queryParamsHandling: 'merge',
      }).then(() => this.store$.dispatch(new RequestsActions.RefreshRequests()))
    )
  );

  /** Starts searching in external sources (like Google) */
  @Effect()
  externalRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.EXTERNAL_REQUEST,
      ),
      withLatestFrom(this.store$.pipe(select(RequestsSelectors.getSelectedRequestId))),
      switchMap(([action, selectedRequestId]) => {
        return this.dataService
          .externalSearchRequest(selectedRequestId)
          .pipe(
            map((data: GetRequestOutput) => {
                return new ExternalSuccess(data);
              }
            ),
            catchError(error =>
              of(new ExternalError({ error }))
            )
          );
      })
    );

  /** Acknowledgment that external search started */
  @Effect()
  externalSuccessEffect$ = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.EXTERNAL_SUCCESS,
      ),
      map(() => {
        return new RequestsActions.RefreshRequests();
      })
    );

  /** Open cancel dialog */
  @Effect()
  openCancelDialogEffect$ = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.OPEN_CANCEL_DIALOG,
      ),
      exhaustMap(({payload}: any) => {
        const addDialogRef = this.dialog.open(ConfirmationPopupComponent, payload);
        return addDialogRef.afterClosed();
      }),
      filter(result => Boolean(result)),
      map(() => {
        return new RequestsActions.CancelRequest();
      })
    );

  /** Cancel external search request */
  @Effect()
  cancelExternalEffect$ = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.CANCEL_REQUEST,
      ),
      withLatestFrom(this.store$.pipe(select(RequestsSelectors.getSelectedRequestId))),
      switchMap(([action, id]: any) => {
        return this.dataService.cancelExternalSearch(id)
          .pipe(
            map(data => {
              return new RequestsActions.CancelSuccess(data);
            }),
            catchError(error =>
              of(new RequestsActions.CancelFailure(error))
            )
          );
      })
    );

  /** Refresh requests and results */
  @Effect({dispatch: false})
  cancelExternalSuccessEffect$ = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.CANCEL_SUCCESS,
      ),
      map(({payload}: any) => {
        this.store$.dispatch(new ResultsActions.RefreshResults(payload.id));
        this.store$.dispatch(new RequestsActions.RefreshRequests());
      })
    );


  /** Route Navigation effect: Search results */
  @Effect({dispatch: false})
  resultsRouted$ = this.actions$.pipe(
    ofRoute('/app/search/:id/results'),
    mapToParam<string>('id'),
    withLatestFrom(this.store$.pipe(select(RequestsSelectors.getIsRequestsLoaded))),
    withLatestFrom(this.store$.pipe(select(RequestsSelectors.getSelectedRequestId))),
    map(([[id, isRequestsLoaded], selectedRequestId]) => {
      if (!isRequestsLoaded) {
        this.store$.dispatch(new RequestsActions.RefreshRequests());
      }
      if (selectedRequestId !== +id) {
        this.store$.dispatch(new RequestsActions.SelectRequest(+id));
      }
    })
  );

  /** Refresh requests history */
  @Effect()
  refreshRequestList$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.REFRESH_REQUESTS,
      ),
      withLatestFrom(this.store$.pipe(select(getRouterQueryParams))),
      switchMap(([action, queryParams]: any) => {
        const listQuery = {
          ...requestsQuery,
            pageNumber: +queryParams.reqPage || 0,
        };
        this.store$.dispatch(new RequestsActions.LoadRequest());
        return this.dataService
          .updateRequestList(listQuery)
          .pipe(
            map((data: SearchRequestListQueryOutput) => {
                return new RequestsActions.LoadSuccess({
                  items: data.items,
                  totalItemCount: data.totalItemCount,
                });
              }
            ),
            catchError(error =>
              of(new RequestsActions.LoadFailure({ error }))
            )
          );
      })
    );

  /** Get selected Request Object, if not in store request from API */
  @Effect()
  selectRequestEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        RequestsActions.ActionTypes.SELECT_REQUEST,
      ),
      switchMap(({payload}: SelectRequest) => {
        return this.dataService.getSearchRequest(payload)
          .pipe(
            takeUntil(merge(this.clearFilters$, this.selectRequest$)),
            map((data) => {
              return new RequestsActions.SelectSuccess({
              ...data
            });
          }),
          catchError(error =>
            of(new RequestsActions.SelectFailure({ error }))
          )
        );
      })
    );

  /** After successful selection, check if request has running external search */
  @Effect({dispatch: false})
  selectSuccess$ = this.actions$.pipe(
    ofType<RequestsActions.SelectSuccess>(RequestsActions.ActionTypes.SELECT_SUCCESS),
    tap(({payload}) => this.updateResults(payload, 0))
  );

  /** SSE message that notifies of running external search status */
  @Effect({dispatch: false})
  externalCompletedEffect$: Observable<any> = this.actions$
    .pipe(
      ofType(RequestsActions.ActionTypes.SSE_EXTERNAL_COMPLETED),
      tap((action: any) => this.showSnackBarSearchRequestUpdated(action)),
      withLatestFrom(this.store$.pipe(select(RequestsSelectors.getSelectedRequest))),
      filter(([{payload}, selectedRequest]) => selectedRequest && payload.id === selectedRequest.id),
      tap(([_, selectedRequest]) => this.updateResults(selectedRequest))
    );

  /**
   * Checks if results need to be refreshed.
   * @param REQUEST_STEP
   */
  queryResultsEvery(REQUEST_STEP: number): Function {
    let NEXT_COUNT = 0;
    return (request: RequestListItem | GetRequestOutput, startCount = NEXT_COUNT) => {
      const {externalSearch, id} = request;
      if (externalSearch) {
        switch (externalSearch.status) {
          case ExternalSearchStatus.SEARCHING: {
            const {countToProcess} = externalSearch;
            /** There is no totalResultsCount in SSE, and if it's new request
             * totalResultsCount also absent in store, that's why we use countToProcess
             * TODO: add totalResultsCount in SSE_EXTERNAL_COMPLETED */
            const totalResultsCount = externalSearch.totalResultsCount || countToProcess;
            NEXT_COUNT = startCount || Math.max(0, totalResultsCount - REQUEST_STEP);
            if (countToProcess <= NEXT_COUNT) {
              NEXT_COUNT = Math.max(0, countToProcess - REQUEST_STEP);
              break;
            }
            return;
          }
          case ExternalSearchStatus.NEW: {
            return;
          }
        }
      }
      this.store$.dispatch(new ResultsActions.RefreshResults(id));
    };
  }

  showSnackBarSearchRequestUpdated(action: any) {
    switch (action.payload.status) {
      case ExternalSearchStatus.SUCCEEDED:
        this.dataService.openSnackBar({
          message: `search.sseRequestCompleted.${ExternalSearchStatus.SUCCEEDED}`,
          type: 'success',
          requestId: action.payload.id
        }, SnackBarSearchRequestComponent);
        break;
      case ExternalSearchStatus.FAILED:
        this.dataService.openSnackBar({
          message: `search.sseRequestCompleted.${ExternalSearchStatus.FAILED}`,
          type: 'failed',
          requestId: action.payload.id
        }, SnackBarSearchRequestComponent);
        break;
    }
  }
}
