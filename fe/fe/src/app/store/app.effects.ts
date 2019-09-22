import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as actions from './actions';
import { Store } from '@ngrx/store';
import { AvatarStoreActions } from '../avatar/store';
import { DataSourceStoreActions } from '../data-source/store';
import { SseConstants } from '../shared/shared.enums';
import { RootStoreState } from './index';
import { ROUTER_BACK_TYPE, ROUTER_FORWARD_TYPE } from '@app/store/actions/router.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SSEExternalCompleted } from '@app/search/store/actions/requests.actions';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { SseActions } from './actions';
import { ErrorCodes } from '@app/models/error.model';
import { AuthService } from '@app/core/services/auth.service';

_('error.request.general');
_('error.app.offline');
_('error.app.online');

@Injectable()
export class RootStoreEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<RootStoreState.State>,
    private router: Router,
    private location: Location,
    private helpers: HelpersService,
    private authService: AuthService
  ) { }

  @Effect({ dispatch: false })
  sseResponse$ = this.actions$
    .pipe(
      ofType(
        actions.SseActions.ActionTypes.SSE_SUCCESS
      ),
      /**
       * Dispatch action according to SSE response type
       */
      map((action: any) => {
        switch (action.payload.type) {
          case SseConstants.SSE_AVATAR_IMPORT_SUCCESS:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarImportActions.ImportCompleteSuccess(action.payload.data)
            );
            break;
          case SseConstants.SSE_AVATAR_IMPORT_FAILED:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarImportActions.ImportCompleteFailure(action.payload.data)
            );
            break;
          case SseConstants.SSE_AVATAR_EXPORT_SUCCESS:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarExportActions.ExportCompleteSuccess(action.payload.data)
            );
            break;
          case SseConstants.SSE_AVATAR_EXPORT_FAILED:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarExportActions.ExportCompleteFailure(action.payload.data)
            );
            break;
          case SseConstants.SSE_AVATAR_LINKING_SUCCESSES:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarConnectionsActions.UpdateConnectionCompleteSuccess(action.payload.data)
            );
            break;
          case SseConstants.SSE_AVATAR_LINKING_FAILED:
            this.store$.dispatch(
              new AvatarStoreActions.AvatarConnectionsActions.UpdateConnectionCompleteFailure(action.payload.data)
            );
            break;
          case SseConstants.EXTERNAL_SEARCH_COMPLETED:
            const { requestId: id, status, countToProcess } = action.payload.data;
            this.store$.dispatch(
              new SSEExternalCompleted({ id, status, countToProcess })
            );
            break;
          case SseConstants.SSE_DATASOURCE_UPDATED:
            this.store$.dispatch(
              new DataSourceStoreActions.DataSourceListActions.DataSourceUpdated(action.payload.data)
            );
            break;
          case SseConstants.SSE_KEEP_ALIVE:
            this.store$.dispatch(
              new SseActions.EventSourceKeepAlive(action.payload.data)
            );
            break;
          default:
            console.log('WRONG SSE TYPE ', action.payload.type);
        }
      })
    );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(ROUTER_BACK_TYPE),
    tap(() => setTimeout(() => this.location.back())));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(ROUTER_FORWARD_TYPE),
    tap(() => setTimeout(() => this.location.forward()))
  );

  /** Global Graphql error handler effect
   * TODO: process all popup messages here
   * */
  @Effect({ dispatch: false })
  graphQlError$ = this.actions$.pipe(
    ofType(actions.ErrorActions.ActionTypes.GRAPHQL_REQUEST_ERROR),
    // tap(({payload}: GraphqlRequestError) => this.helpers.openSnackBar({
    //     message: 'error.request.general',
    //     type: 'failed',
    //     messageOptions: {
    //       type: payload.message,
    //       message: ` "${payload.operationName}": ${payload.message}`
    //     }
    //   },
    //   null))
  );


  /** When app failed to load module */
  @Effect({ dispatch: false })
  appIsOffline$ = this.actions$.pipe(
    ofType(actions.ErrorActions.ActionTypes.APP_IS_OFFLINE),
    tap(() => this.helpers.openSnackBar({
      message: 'error.app.offline',
      type: 'failed',
    }))
  );

  /** When app succeeded to load module */
  @Effect({ dispatch: false })
  appIsOnline$ = this.actions$.pipe(
    ofType(actions.ErrorActions.ActionTypes.APP_IS_ONLINE),
    tap(() => this.helpers.openSnackBar({
      message: 'error.app.online',
      type: 'success',
    }, null, {
        duration: 2000
      }))
  );

  @Effect({ dispatch: false })
  sseFailureEffect$ = this.actions$.pipe(
    ofType<any>(SseActions.ActionTypes.SSE_FAILURE),
    tap(({payload}) => {
      switch (payload.errorCode) {
        case ErrorCodes.UNAUTHORIZED: {
          this.authService.clearLoginData();
        }
      }
    })
  );
}
