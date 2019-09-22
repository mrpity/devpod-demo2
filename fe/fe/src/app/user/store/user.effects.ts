import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as actions from './actions';
import { Store } from '@ngrx/store';
import * as UserStoreSelectors from './user.selectors';
import * as UserStoreState from './user.state';
import { Router } from '@angular/router';
import { UserList, User } from '../models/user.model';

@Injectable()
export class UserStoreEffects {

  constructor(
    private dataService: UserService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<UserStoreState.State>,
  ) {}

  @Effect()
  loadUserListEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.UserListActions.ActionTypes.FETCH_DATA,
        actions.UserListActions.ActionTypes.CHANGE_PAGINATION,
        actions.UserListActions.ActionTypes.CHANGE_SORTING
      ),
      /* Get LAST values of ListQuery */
      withLatestFrom(this.store$.select(UserStoreSelectors.getListQuery)),

      /* Use LAST values of ListQuery */
      switchMap(([action, listQuery]) => {
        this.store$.dispatch(new actions.UserListActions.LoadRequest());
        return this.dataService
          .getUserList(listQuery)
          .pipe(
            map((data: UserList) =>
              new actions.UserListActions.LoadSuccess(data)
            ),
            catchError(error =>
              observableOf(new actions.UserListActions.LoadFailure({ error }))
            )
          );
      })
    );

  @Effect()
  createUserEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.CREATE_NEW_REQUEST
      ),
      /* Save avatar data on server */
      switchMap((action: actions.UserCrudActions.CreateRequest) => {
        return this.dataService
          .createUser(action.payload)
          .pipe(
            map(() => {
              this.router.navigate(['/app/user/list']);
              return new actions.UserCrudActions.CreateSuccess();
            }),
            catchError(error =>
              observableOf(new actions.UserCrudActions.CreateFailure({ error })
            ))
          );
      })
    );

  @Effect()
  updateUserEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.UPDATE_REQUEST
      ),
      /* Save avatar data on server */
      switchMap((action: actions.UserCrudActions.UpdateRequest) => {
        return this.dataService
          .modifyUser(action.payload)
          .pipe(
            map(() => {
              this.router.navigate(['/app/user/details', action.payload.id]);
              return new actions.UserCrudActions.UpdateSuccess(action.payload.id);
            }),
            catchError(error =>
              observableOf(new actions.UserCrudActions.UpdateFailure({ error }))
            )
          );
      })
    );

  @Effect()
  getUserDetailsEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.LOAD_DETAILS_REQUEST
      ),
      /* Get avatar data from server */
      switchMap((action: actions.UserCrudActions.LoadDetailsRequest) => {
        return this.dataService
          .getUserDetails(action.payload.id)
          .pipe(
            map((res: User) => {
              const data = {
                ...res
              };
              return new actions.UserCrudActions.LoadDetailsSuccess(data);
            }),
            catchError(error =>
              observableOf(new actions.UserCrudActions.LoadDetailsFailure({ error }))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  successUserCreateEffect$ = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.CREATE_NEW_SUCCESS
      ),
      /* Redirect on success avatar save */
      map(() => {
        this.dataService.openSnackBar({
          message: 'user.validation.createSuccess',
          type: 'success'
        },
        null,
        {
          duration: 4000
        });
      })
    );

  @Effect({ dispatch: false })
  successUserUpdateEffect$ = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.UPDATE_SUCCESS
      ),
      /* Redirect on success avatar save */
      map((action: actions.UserCrudActions.UpdateSuccess) => {
        this.dataService.openSnackBar({
          message: 'user.validation.updateSuccess',
          type: 'success'
        },
        null,
        {
          duration: 4000
        });
      })
    );

  @Effect({ dispatch: false })
  failureUserCreateEffect$ = this.actions$
    .pipe(
      ofType(
        actions.UserCrudActions.ActionTypes.CREATE_NEW_FAILURE
      ),
      /* Redirect on success avatar save */
      map((action: actions.UserCrudActions.CreateFailure) => {
        this.dataService.openSnackBar({
          message: 'user.validation.createFailed',
          type: 'failed',
          messageOptions: action.payload.error ? {
            type: action.payload.error.message,
            message: `user.validation.${action.payload.error.message}`
          } : null
        },
        null,
        {
          duration: 4000
        });
      })
    );
}
