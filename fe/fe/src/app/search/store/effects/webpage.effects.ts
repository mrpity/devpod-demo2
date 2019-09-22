import { Injectable } from '@angular/core';
import { SearchService } from '@app/search/services/search.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ofRoute } from '@app/store/operators/route.operator';
import { WebPageActions } from '@app/search/store/actions';
import { SearchState } from '@app/search/store/reducers';
import {WebPageDetailsParams} from '@app/search/models/webpage.model';

@Injectable()
export class WebPageEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions,
    private store$: Store<SearchState>
  ) { }

  /**
   * Loads WebPage's data (for general and friends tabs)
   */
  @Effect()
  loadResultWebPageDetailsRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        WebPageActions.ActionTypes.LOAD_REQUEST,
      ),
      switchMap(({ payload }: WebPageActions.LoadRequest) => {
        return this.dataService
          .getWebPage(payload)
          .pipe(
            map((data: any) => new WebPageActions.LoadSuccess(data)),
            catchError(error => {
              return observableOf(new WebPageActions.LoadFailure({ error }));
            })
          );
      })
    );

  /**
   * Router navigation effect WebPage details page
   */
  @Effect({ dispatch: false })
  webPageRouted$ = this.actions$.pipe(
    ofRoute('/app/search/:id/results/webpage/:index/:documentId/:tabs'),
    map((action: any) => {
      const { index, documentId }: WebPageDetailsParams = action.payload.routerState.params;
      return this.store$.dispatch(new WebPageActions.LoadRequest({
        index,
        documentId
      }));
    })
  );
}
