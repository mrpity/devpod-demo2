import { Injectable } from '@angular/core';
import { SearchService } from '@app/search/services/search.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ofRoute } from '@app/store/operators/route.operator';
import { ProfileActions } from '@app/search/store/actions';
import { SearchState } from '@app/search/store/reducers';
import { ProfileDetailsParams } from '@app/search/models/profile.model';

@Injectable()
export class ProfileEffects {
  constructor(
    private dataService: SearchService,
    private actions$: Actions,
    private store$: Store<SearchState>
  ) { }

  /**
   * Loads Profile's data (for general and friends tabs)
   */
  @Effect()
  loadResultProfileDetailsRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ProfileActions.ActionTypes.LOAD_REQUEST,
      ),
      switchMap(({ payload }: ProfileActions.LoadRequest) => {
        return this.dataService
          .getProfile(payload)
          .pipe(
            map((data: any) => new ProfileActions.LoadSuccess(data)),
            catchError(error => {
              return observableOf(new ProfileActions.LoadFailure({ error }));
            })
          );
      })
    );

  /**
   * Request Profile's Photo On Success Profile result
   */
  @Effect()
  requestResultProfilePhotoRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ProfileActions.ActionTypes.LOAD_SUCCESS,
      ),
      map(({ payload }: ProfileActions.LoadSuccess) => new ProfileActions.LoadPhotoRequest(payload.profilePhotoPath))
    );

  /**
   * Loads Profile's Photo
   */
  @Effect()
  loadResultProfilePhotoRequest$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        ProfileActions.ActionTypes.LOAD_PHOTO_REQUEST,
      ),
      switchMap(({ payload }: ProfileActions.LoadPhotoRequest) => {
        return this.dataService
          .getProfilePhotoRequest(payload)
          .pipe(
            map((data: any) => new ProfileActions.LoadPhotoSuccess(data)),
            catchError(error => {
              return observableOf(new ProfileActions.LoadPhotoFailure({ error }));
            })
          );
      })
    );

  /**
   * Router navigation effect Profile details page
   */
  @Effect({ dispatch: false })
  profileRouted$ = this.actions$.pipe(
    ofRoute('/app/search/:id/results/profile/:index/:documentId/:tabs'),
    map((action: any) => {
      const { index, documentId }: ProfileDetailsParams = action.payload.routerState.params;
      return this.store$.dispatch(new ProfileActions.LoadRequest({
        index,
        documentId
      }));
    })
  );
}
