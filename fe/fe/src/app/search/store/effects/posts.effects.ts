import { Injectable } from '@angular/core';
import { SearchService } from '@app/search/services/search.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostDetailsParams } from '@app/search/models/post.model';
import { ofRoute } from '@app/store/operators/route.operator';
import { PostActions, ResultsActions } from '@app/search/store/actions';
import { Router } from '@angular/router';
import { SearchState } from '@app/search/store/reducers';

@Injectable()
export class PostsEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<SearchState>,
  ) { }

  /**
   * Loads Post's data in general tab
   */
  @Effect()
  loadResultDetailsRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        PostActions.ActionTypes.LOAD_REQUEST,
      ),
      switchMap(({ payload }: PostActions.LoadRequest) => {
        return this.dataService
          .getPostRequest(payload)
          .pipe(
            map((data) => new PostActions.LoadSuccess(data)),
            catchError(error => {
              return observableOf(new PostActions.LoadFailure({ error }));
            })
          );
      })
    );

  /**
   * Loads POSTs data in origin tab
   */
  @Effect()
  loadResultDetailsOriginDocuments$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        PostActions.ActionTypes.FIND_ORIGIN_DOCUMENTS,
      ),
      switchMap(({ payload }: PostActions.FindOriginDocuments) => {
        return this.dataService
          .findOriginDocuments(payload)
          .pipe(
            map((data) => new PostActions.FindOriginDocumentsSuccess(data)),
            catchError(error => {
              return observableOf(new PostActions.FindOriginDocumentsFailure({ error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  changePaginationEffect$ = this.actions$
    .pipe(
      ofType(
        ResultsActions.ActionTypes.CLOSE_DETAILS,
      ),
      map(({ payload }: ResultsActions.CloseDetails) => {
        const { id, route } = payload;
        this.router.navigate(['../../../../'], {
          relativeTo: route,
          fragment: `c_itemCnt_${id}`,
          queryParamsHandling: 'merge'
        });
      })
    );

  /**
   * Router navigation effect POST details page
   */
  @Effect({ dispatch: false })
  postsRouted$ = this.actions$.pipe(
    ofRoute('/app/search/:id/results/post/:index/:documentId/:tabs'),
    map((action: any) => {
      const { index, documentId, tabs }: PostDetailsParams = action.payload.routerState.params;
      switch (tabs) {
        case 'general': {
          return this.store$.dispatch(new PostActions.LoadRequest({
            index,
            documentId
          }));
        }
        case 'origin': {
          return this.store$.dispatch(new PostActions.FindOriginDocuments({
            index,
            documentId
          }));
        }
      }
    })
  );

  /**
   * Navigation inside origin details page.
   * Navigate to /app/search/resultId/results/contentType/index/documentId/general
   */
  @Effect({ dispatch: false })
  openOriginDetails$ = this.actions$
    .pipe(
      ofType(
        PostActions.ActionTypes.OPEN_ORIGIN_DETAILS,
      ),
      map(({ payload }: PostActions.OpenOriginDetails) => {
        const { result, route } = payload;
        this.router.navigate(['../../../../', result.contentType, result.index, result.documentId, 'general'],
          {
            relativeTo: route,
            queryParamsHandling: 'merge'
          });
      })
    );
}
