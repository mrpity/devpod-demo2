import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, timer } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from './actions/index';
import { Store } from '@ngrx/store';
import * as ProxyStoreSelectors from './proxy.selectors';
import * as ProxyStoreState from './proxy.state';
import { Router } from '@angular/router';
import { ProxyService } from '../services/proxy.service';
import { DataSourceService } from '../../data-source/services/data-source.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { HelpersService } from '../../shared/services/helpers.service';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { ProxyAddDialogComponent } from '../components/proxy-add-dialog/proxy-add-dialog.component';
import { ProxyEditDialogComponent } from '../components/proxy-edit-dialog/proxy-edit-dialog.component';

@Injectable()
export class ProxyStoreEffects {
  dialogRef: MatDialogRef<ConfirmationPopupComponent, boolean>;
  constructor(
    private dataService: ProxyService,
    private dataSourceService: DataSourceService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<ProxyStoreState.State>,
    private snackBar: MatSnackBar,
    private helpers: HelpersService,
    private dialog: MatDialog
  ) { }

  @Effect()
  loadProxyListEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyListActions.ActionTypes.FETCH_DATA,
        actions.ProxyListActions.ActionTypes.CHANGE_PAGINATION,
        actions.ProxyListActions.ActionTypes.CHANGE_FILTER,
        actions.ProxyListActions.ActionTypes.CHANGE_SORTING
      ),
      /* Get LAST values of ListQuery */
      withLatestFrom(this.store$.select(ProxyStoreSelectors.getListQuery)),

      /* Use LAST values of ListQuery */
      switchMap(([action, listQuery]) => {
        this.store$.dispatch(new actions.ProxyListActions.LoadRequest());
        return this.dataService
          .updateProxyList(listQuery)
          .pipe(
            map((data) =>
              new actions.ProxyListActions.LoadSuccess({
                proxies: data.proxies,
                totalItemCount: data.totalItemCount
              })
            ),
            catchError(error =>
              observableOf(new actions.ProxyListActions.LoadFailure({ error }))
            )
          );
      })
    );

  @Effect()
  addProxyEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.ADD_NEW_REQUEST
      ),
      /* Save proxy data on server */
      switchMap((action: any) => {
        return this.dataService
          .addProxy(action.payload)
          .pipe(
            map((result) => {
              return new actions.ProxyAddActions.AddSuccess();
            }),
            catchError(error =>
              observableOf(new actions.ProxyAddActions.AddFailure({ error }))
            )
          );
      })
    );

  @Effect()
  updateProxyEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyDetailsActions.ActionTypes.UPDATE_REQUEST
      ),
      /* Save proxy data on server */
      switchMap((action: any) => {
        return this.dataService
          .modifyProxy(action.payload)
          .pipe(
            map(() => new actions.ProxyDetailsActions.UpdateSuccess(action.payload.id)),
            catchError(error =>
              observableOf(new actions.ProxyDetailsActions.UpdateFailure({ error }))
            )
          );
      })
    );

  @Effect()
  addNewSuccessEffect$ = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.ADD_NEW_SUCCESS
      ),
      map((result, test) => {
        this.helpers.showSuccessSnackBar(_('settings.proxy.add.new.success'));
        return new actions.ProxyListActions.FetchDataByDefault();
      })
    );

  @Effect()
  addNewFailureEffect$ = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.ADD_NEW_FAILURE
      ),
      map(() => {
        this.helpers.showErrorSnackBar(_('settings.proxy.add.new.error'));
        return new actions.ProxyListActions.FetchDataByDefault();
      })
    );

  @Effect()
  deleteProxyEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyDeleteActions.ActionTypes.DELETE_REQUEST
      ),
      /* Save proxy data on server */
      switchMap((action: any) => {
        return this.dataService
          .deleteProxy(action.payload)
          .pipe(
            map(() => {
              return new actions.ProxyDeleteActions.DeleteSuccess(action.payload);
            }),
            catchError(error =>
              observableOf(new actions.ProxyDeleteActions.DeleteFailure({ error }))
            )
          );
      })
    );

  @Effect()
  deleteProxySuccessEffect$ = this.actions$
    .pipe(
      ofType(
        actions.ProxyDeleteActions.ActionTypes.DELETE_SUCCESS
      ),
      map((action: any) => {
        const resultMessage = this.helpers.getDeleteProxyMessage(action.payload, 'success');
        this.helpers.showSuccessSnackBar(resultMessage);
        return new actions.ProxyListActions.FetchDataByDefault();
      })
    );

  @Effect()
  deleteProxyFailureEffect$ = this.actions$
    .pipe(
      ofType(
        actions.ProxyDeleteActions.ActionTypes.DELETE_FAILURE
      ),
      map(() => {
        this.helpers.showErrorSnackBar(_('settings.proxy.delete.error'));
        return new actions.ProxyListActions.FetchDataByDefault();
      })
    );

  @Effect()
  redirectOnProxyEffect$ = this.actions$
    .pipe(
      ofType(
        actions.ProxyDetailsActions.ActionTypes.UPDATE_SUCCESS
      ),
      map(() => {
        this.helpers.showSuccessSnackBar(_('settings.proxy.update.success'));
        return new actions.ProxyListActions.FetchDataByDefault();
      })
    );


  @Effect()
  getProxyCountriesEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.GET_PROXY_SETTINGS_REQUEST
      ),
      switchMap((action: any) => {
        return this.dataService
          .getAllProxySettings()
          .pipe(
            map((data) => new actions.ProxyAddActions.GetProxySettingsSuccess(
              {
                countries: data.getAllProxyCountries.value,
                types: data.getProxyTypes.types
              }
            )),
            catchError(error =>
              observableOf(new actions.ProxyAddActions.GetProxySettingsFailure({ error }))
            )
          );
      })
    );


  @Effect()
  getProxyDetailsEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyDetailsActions.ActionTypes.LOAD_DETAILS_REQUEST
      ),
      switchMap((action: any) => {
        return this.dataService
          .getProxyDetails(action.payload.id)
          .pipe(
            map((data) => new actions.ProxyDetailsActions.LoadDetailsSuccess(data)),
            catchError(error =>
              observableOf(new actions.ProxyDetailsActions.LoadDetailsFailure({ error }))
            )
          );
      })
    );

  @Effect()
  openAddProxyDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.OPEN_ADD_DIALOG
      ),
      exhaustMap((action: any) => {
        const addDialogRef = this.dialog.open(ProxyAddDialogComponent, action.payload);
        return addDialogRef.afterClosed();
      }),
      map((result: any) => {
        if (!!result) {
          return new actions.ProxyAddActions.AddRequest(result);
        }
        return new actions.ProxyAddActions.CloseAddDialog();
      }),
    );

  @Effect()
  openEditProxyDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyDetailsActions.ActionTypes.OPEN_DETAILS_DIALOG
      ),
      exhaustMap((action: any) => {
        const addDialogRef = this.dialog.open(ProxyEditDialogComponent, action.payload);
        return addDialogRef.afterClosed();
      }),
      map((result: any) => {
        if (!!result) {
          return new actions.ProxyDetailsActions.UpdateRequest(result);
        }
        return new actions.ProxyDetailsActions.CloseDetailsDialog();
      }),
    );

  @Effect()
  openDeleteProxyDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyDeleteActions.ActionTypes.OPEN_DELETE_DIALOG
      ),
      exhaustMap((action: any) => {
        const deleteDialogRef = this.helpers.openConfirmDialog(action.payload);
        return deleteDialogRef.afterClosed();
      }),
      map((result: any) => {
        if (!!result) {
          return new actions.ProxyDeleteActions.DeleteRequest(result.payload);
        }
        return new actions.ProxyDeleteActions.CloseDeleteDialog();
      }),
    );

  @Effect()
  FindLocationByHostRequestEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.ProxyAddActions.ActionTypes.FIND_LOCATION_BY_HOST_REQUEST
      ),
      switchMap((action: any) => {
        return this.dataService
          .findProxyLocation(action.payload)
          .pipe(
            map((data: any) => new actions.ProxyAddActions.FindLocationByHostSuccess(data),
              catchError(error =>
                observableOf(new actions.ProxyAddActions.FindLocationByHostFailure({ error }))
              ))
          );
      })
    );
}
