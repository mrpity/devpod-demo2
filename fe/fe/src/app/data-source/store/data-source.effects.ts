import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import * as actions from '@app/data-source/store/actions';
import * as DataSourceStoreSelectors from '../store/data-source.selectors';
import * as DataSourceStoreState from '../store/data-source.state';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { DataSourceService } from '../services/data-source.service';
import { DataSourceListStatuses } from '../models/data-source.model';
import { Router } from '@angular/router';
import { ProxyRegionInterface } from '../models/data-source-crud.model';
import { CreateRequest } from '@app/data-source/store/actions/data-source-mutations.actions';
import { ofRoute } from '@app/store/operators/route.operator';
import { SearchService } from '@app/search/services/search.service';
import { ContentTypeEnum } from '@app/search/models/result.model';
import { ProfileActions } from '@app/search/store/actions';
import { CrawlingTypesService } from '@app/data-source/services/crawling-types.service';

@Injectable()
export class DataSourceStoreEffects {

  private snackBarOptions = {
    duration: 4000
  };

  constructor(
    private actions$: Actions,
    private store$: Store<DataSourceStoreState.State>,
    private router: Router,
    private dataService: DataSourceService,
    private searchService: SearchService,
    private byTypeService: CrawlingTypesService
  ) { }

  @Effect()
  loadDataSourceList$: Observable<Action> = this.actions$.pipe(
    ofType(
      actions.DataSourceListActions.ActionTypes.LOAD_REQUEST
    ),
    withLatestFrom(this.store$.pipe(
      select(DataSourceStoreSelectors.getListQuery)
    )),
    switchMap(([action, listQuery]) => {
      return this.dataService.getDataSourceList(listQuery).pipe(
        map((data) => new actions.DataSourceListActions.LoadSuccess({
          dataSources: data.items,
          totalItemCount: data.totalItemCount
        })),
        catchError(error => {
          return observableOf(new actions.DataSourceListActions.LoadFailure({ error }));
        }
        )
      );
    })
  );

  @Effect({ dispatch: false })
  refreshDataSourceList$ = this.actions$.pipe(
    ofType(
      actions.DataSourceListActions.ActionTypes.FETCH_DATA,
      actions.DataSourceListActions.ActionTypes.CHANGE_PAGINATION,
      actions.DataSourceListActions.ActionTypes.CHANGE_FILTER,
      actions.DataSourceListActions.ActionTypes.CHANGE_SORTING
    ),
    map(
      (action: any) => {
        this.store$.dispatch(new actions.DataSourceListActions.LoadRequest());
      }
    )
  );

  @Effect()
  loadDataSourceListStatuses: Observable<Action> = this.actions$.pipe(
    ofType(
      actions.DataSourceListActions.ActionTypes.LIST_STATUSES_LOAD
    ),
    withLatestFrom(this.store$.pipe(
      select(DataSourceStoreSelectors.getListQuery)
    )),
    switchMap(([action, listQuery]) => {
      return this.dataService.getDataSourceListStatuses(listQuery).pipe(
        map((data) => {
          const listStatusesObj: DataSourceListStatuses = {};
          data.items.forEach((item) => {
            listStatusesObj[item.id] = item.status;
          });
          return new actions.DataSourceListActions.ListStatusesSuccess(listStatusesObj);
        }),
        catchError(error => {
          return observableOf(new actions.DataSourceListActions.ListStatusesFailure({ error }));
        }
        )
      );
    })
  );

  @Effect()
  loadDataSourceAndProxiesEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_REQUEST
      ),
      /* Get Data Source general info and proxies list from server */
      switchMap((action: any) => {
        return this.dataService
          .getDataSourceAndProxies(action.payload)
          .pipe(
            mergeMap(
              (data: any) => [
                new actions.DataSourceDetailsActions.LoadDataSourceAndProxiesSuccess(),
                new actions.DataSourceDetailsActions.LoadGeneralInfoSuccess(data.generalInfo),
                new actions.DataSourceDetailsActions.LoadProxiesSuccess(data.regions)
              ]
            ),
            catchError(error =>
              observableOf(new actions.DataSourceDetailsActions.LoadDataSourceAndProxiesFailure({ error }))
            )
          );
      })
    );

  @Effect()
  loadStatisticsEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.LOAD_STATISTICS_REQUEST
      ),
      /* Get Data Source statistics from server */
      switchMap((action: any) => {
        return this.dataService
          .getDataSourceStatistic(action.payload)
          .pipe(
            map(
              (data: any) => new actions.DataSourceDetailsActions.LoadStatisticsSuccess(data)
            ),
            catchError(error =>
              observableOf(new actions.DataSourceDetailsActions.LoadStatisticsFailure({ error }))
            )
          );
      })
    );

  @Effect()
  createDataSourceEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.CREATE_NEW_REQUEST
      ),
      /* Save Data Source data on server */
      switchMap(({ payload }: CreateRequest) => {
        return this.dataService
          .add(payload)
          .pipe(
            map(() => new actions.DataSourceCrudActions.CreateSuccess()),
            catchError(error =>
              observableOf(new actions.DataSourceCrudActions.CreateFailure({ error }))
            )
          );
      })
    );

  @Effect()
  createDataInBatchSourceEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_REQUEST
      ),
      /* Save Data Source data on server */
      switchMap((action: any) => {
        return this.dataService
          .addDataSourcesInBatch(action.payload)
          .pipe(
            map(() => new actions.DataSourceCrudActions.CreateInBatchSuccess()),
            catchError(error =>
              observableOf(new actions.DataSourceCrudActions.CreateInBatchFailure({ error }))
            )
          );
      })
    );

  @Effect()
  updateDataSourceEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.UPDATE_REQUEST
      ),
      /* Save Data Source data on server */
      switchMap((action: any) => {
        return this.dataService
          .update(action.payload)
          .pipe(
            map((res) => new actions.DataSourceCrudActions.UpdateSuccess(res)),
            catchError(error =>
              observableOf(new actions.DataSourceCrudActions.UpdateFailure({ error }))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  createDataSourceSuccessEffect$ = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.CREATE_NEW_SUCCESS,
        actions.DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_SUCCESS
      ),
      /* Redirect and show message on success Data Source Create */
      map((action: any) => {
        this.navigateToList();
        this.dataService.openSnackBar({
          message: this.setMessage(action.type),
          type: 'success'
        },
          null,
          this.snackBarOptions);
      })
    );

  @Effect({ dispatch: false })
  updateDataSourceSuccessEffect$ = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.UPDATE_SUCCESS,
      ),
      /* Redirect and show message on success Data Source Update */
      map((action: any) => {
        this.navigateToDetails(action.payload);
        this.dataService.openSnackBar({
          message: this.setMessage(action.type),
          type: 'success'
        },
          null,
          this.snackBarOptions);
      })
    );

  @Effect({ dispatch: false })
  createDataSourceFailureEffect$ = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.CREATE_NEW_FAILURE,
        actions.DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_FAILURE,
        actions.DataSourceCrudActions.ActionTypes.UPDATE_FAILURE
      ),
      /* Show message on failure Data Source Create */
      map(() => {
        this.dataService.openSnackBar({
          message: 'dataSource.addDataSource.errorsMsg',
          type: 'failed'
        },
          null,
          this.snackBarOptions);
      })
    );

  @Effect()
  changeDataSourceStateEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceCrudActions.ActionTypes.CHANGE_STATE_REQUEST
      ),
      /* Save Data Source data on server */
      switchMap((action: any) => {
        return this.dataService
          .changeState(action.payload.enabled, action.payload.id)
          .pipe(
            map((res) => new actions.DataSourceCrudActions.ChangeStateSuccess()),
            catchError(error =>
              observableOf(new actions.DataSourceCrudActions.ChangeStateFailure({ error }))
            )
          );
      })
    );

  @Effect()
  getDataSourceProxiesEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.LOAD_PROXIES_REQUEST
      ),
      switchMap(() => {
        return this.dataService
          .getProxyCountriesList()
          .pipe(
            map((data: ProxyRegionInterface[]) => new actions.DataSourceDetailsActions.LoadProxiesSuccess(data),
              catchError(error =>
                observableOf(new actions.DataSourceDetailsActions.LoadProxiesFailure({ error }))
              )
            ));
      })
    );

  /**
   * Get Document info or Document data if they not in store
   */
  @Effect({ dispatch: false })
  documentInfoRouted$ = this.actions$.pipe(
    ofRoute(new RegExp('^\\/app\\/data-source\\/details\\/:id\\/document$', 'g')),
    withLatestFrom(this.store$.pipe(select(DataSourceStoreSelectors.getDocumentInfo))),
    map(([action, documentInfo]): any => {
      const { documentId }: any = documentInfo || {};
      if (!documentId) {
        const { id } = action.payload.routerState.params;
        this.store$.dispatch(new actions.DataSourceDetailsActions.GetDocumentInfoRequest(id));
      } else {
        this.store$.dispatch(new actions.DataSourceDetailsActions.GetDocumentDataRequest());
      }
    })
  );


  /**
   * Get Document Info Effect
   */
  @Effect()
  getDocumentInfoEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_REQUEST
      ),
      switchMap((action: any) => {
        return this.dataService
          .getDocumentInfoQuery(action.payload)
          .pipe(
            map((res) => new actions.DataSourceDetailsActions.GetDocumentInfoSuccess(res)),
            catchError(error =>
              observableOf(new actions.DataSourceDetailsActions.GetDocumentInfoFailure({ error }))
            )
          );
      })
    );

  /**
   * Get Document Info Success Effect
   */
  @Effect()
  getDocumentInfoSuccessEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_INFO_SUCCESS
      ),
      withLatestFrom(this.store$.pipe(select(DataSourceStoreSelectors.getDocumentData))),
      filter(([action, documentData]: any) => action.payload.documentId && !documentData),
      map((): any => {
        return new actions.DataSourceDetailsActions.GetDocumentDataRequest();
      })
    );


  /**
   * Get Document Data Request Effect
   */
  @Effect()
  getDocumentDataRequestEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_REQUEST
      ),
      withLatestFrom(this.store$.pipe(select(DataSourceStoreSelectors.getDocumentInfo))),
      filter(([action, { documentId, index, contentType }]): any => this.byTypeService.byDocumentType(contentType)),
      switchMap(([action, { documentId, index, contentType }]: any) => {
        const input = { documentId, index };
        return this.searchService.getDocumentData(contentType, input)
          .pipe(
            map((res) => new actions.DataSourceDetailsActions.GetDocumentDataSuccess(res)),
            catchError(error =>
              observableOf(new actions.DataSourceDetailsActions.GetDocumentDataFailure({ error }))
            )
          );
      })
    );


  /**
   * Modify Document Data Effect
   */
  @Effect({ dispatch: false })
  changeDocumentDataEffect$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        actions.DataSourceDetailsActions.ActionTypes.GET_DOCUMENT_DATA_SUCCESS
      ),
      withLatestFrom(this.store$.pipe(select(DataSourceStoreSelectors.getDocumentInfo))),
      map(([{ payload }, { contentType }]: any): any => {
        switch (contentType) {
          case ContentTypeEnum.profile: {
            if (payload.profilePhotoPath) {
              this.store$.dispatch(new ProfileActions.LoadPhotoRequest(payload.profilePhotoPath));
            }
          }
        }
      })
    );

  private setMessage(type: string) {
    switch (type) {
      case actions.DataSourceCrudActions.ActionTypes.UPDATE_SUCCESS:
        return 'dataSource.editDataSource.successMsg';
      case actions.DataSourceCrudActions.ActionTypes.CREATE_NEW_SUCCESS:
      case actions.DataSourceCrudActions.ActionTypes.CREATE_IN_BATCH_SUCCESS:
      default:
        return 'dataSource.addDataSource.successMsg';
    }
  }

  private navigateToList() {
    this.router.navigate(['app/data-source/list']);
  }

  private navigateToDetails(id) {
    this.router.navigate(['app/data-source/details', id, 'general']);
  }
}
