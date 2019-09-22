import { Action } from '@ngrx/store';
import {
  DataSourceDetailInterface,
  ProxyRegionInterface,
  DataSourceStatisticOutput, DocumentInfoOutput, DocumentDataType
} from '@app/data-source/models/data-source-crud.model';

export enum ActionTypes {
  LOAD_DATA_SOURCE_AND_PROXIES_REQUEST = '[Data Source][General|Proxies] Load General Info And Proxies Request',
  LOAD_DATA_SOURCE_AND_PROXIES_FAILURE = '[Data Source][General|Proxies] Load General Info And Proxies Failure',
  LOAD_DATA_SOURCE_AND_PROXIES_SUCCESS = '[Data Source][General|Proxies] Load General Info And Proxies Success',
  LOAD_PROXIES_REQUEST = '[Data Source][Proxies] Load Proxies Request',
  LOAD_PROXIES_SUCCESS = '[Data Source][Proxies] Load Proxies Success',
  LOAD_PROXIES_FAILURE = '[Data Source][Proxies] Load Proxies Failure',
  LOAD_GENERAL_INFO_REQUEST = '[Data Source][General] Load General Info Request',
  LOAD_GENERAL_INFO_FAILURE = '[Data Source][General] Load General Info Failure',
  LOAD_GENERAL_INFO_SUCCESS = '[Data Source][General] Load General Info Success',
  LOAD_STATISTICS_REQUEST = '[Data Source][Statistics] Load Statistics Request',
  LOAD_STATISTICS_FAILURE = '[Data Source][Statistics] Load Statistics Failure',
  LOAD_STATISTICS_SUCCESS = '[Data Source][Statistics] Load Statistics Success',
  CLEAR_SELECTED_DATA_SOURCE = '[Data Source][Clear] Clear Data Source',
  GET_DOCUMENT_INFO_REQUEST = '[Data Source][Details] Get Document Info Request',
  GET_DOCUMENT_INFO_SUCCESS = '[Data Source][Details] Get Document Info Success',
  GET_DOCUMENT_INFO_FAILURE = '[Data Source][Details] Get Document Info Failure',
  GET_DOCUMENT_DATA_REQUEST = '[Data Source][Details] Get Document Data Request',
  GET_DOCUMENT_DATA_SUCCESS = '[Data Source][Details] Get Document Data Success',
  GET_DOCUMENT_DATA_FAILURE = '[Data Source][Details] Get Document Data Failure',
  CHANGE_TAB = '[Data Source][Details] Change Tab',
}

export class LoadGeneralInfoRequest implements Action {
  readonly type = ActionTypes.LOAD_GENERAL_INFO_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadGeneralInfoFailure implements Action {
  readonly type = ActionTypes.LOAD_GENERAL_INFO_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadGeneralInfoSuccess implements Action {
  readonly type = ActionTypes.LOAD_GENERAL_INFO_SUCCESS;
  constructor(public payload: DataSourceDetailInterface) {}
}

export class LoadDataSourceAndProxiesRequest implements Action {
  readonly type = ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_REQUEST;
  constructor(public payload: number) {}
}

export class LoadDataSourceAndProxiesSuccess implements Action {
  readonly type = ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_SUCCESS;
  constructor() {}
}

export class LoadDataSourceAndProxiesFailure implements Action {
  readonly type = ActionTypes.LOAD_DATA_SOURCE_AND_PROXIES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadStatisticsRequest implements Action {
  readonly type = ActionTypes.LOAD_STATISTICS_REQUEST;
  constructor(public payload: number) {}
}

export class LoadStatisticsSuccess implements Action {
  readonly type = ActionTypes.LOAD_STATISTICS_SUCCESS;
  constructor(public payload: DataSourceStatisticOutput) {}
}

export class LoadStatisticsFailure implements Action {
  readonly type = ActionTypes.LOAD_STATISTICS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadProxiesRequest implements Action {
  readonly type = ActionTypes.LOAD_PROXIES_REQUEST;
  constructor() {}
}

export class LoadProxiesSuccess implements Action {
  readonly type = ActionTypes.LOAD_PROXIES_SUCCESS;
  constructor(public payload: ProxyRegionInterface[]) {}
}

export class LoadProxiesFailure implements Action {
  readonly type = ActionTypes.LOAD_PROXIES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ClearSelectedDataSource implements Action {
  readonly type = ActionTypes.CLEAR_SELECTED_DATA_SOURCE;
  constructor() {}
}

export class GetDocumentInfoRequest implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_INFO_REQUEST;
  constructor(public payload: number | string) {}
}

export class GetDocumentInfoSuccess implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_INFO_SUCCESS;
  constructor(public payload: DocumentInfoOutput) {}
}

export class GetDocumentInfoFailure implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_INFO_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetDocumentDataRequest implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_DATA_REQUEST;
  constructor() {}
}

export class GetDocumentDataSuccess implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_DATA_SUCCESS;
  constructor(public payload: DocumentDataType) {}
}

export class GetDocumentDataFailure implements Action {
  readonly type = ActionTypes.GET_DOCUMENT_DATA_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class ChangeTab implements Action {
  readonly type = ActionTypes.CHANGE_TAB;
  constructor(public payload: number) {}
}


export type Actions =
  LoadGeneralInfoRequest
  | LoadGeneralInfoFailure
  | LoadGeneralInfoSuccess
  | LoadProxiesRequest
  | LoadProxiesSuccess
  | LoadProxiesFailure
  | LoadDataSourceAndProxiesRequest
  | LoadDataSourceAndProxiesSuccess
  | LoadDataSourceAndProxiesFailure
  | LoadStatisticsRequest
  | LoadStatisticsFailure
  | LoadStatisticsSuccess
  | ClearSelectedDataSource
  | GetDocumentInfoRequest
  | GetDocumentInfoSuccess
  | GetDocumentInfoFailure
  | GetDocumentDataRequest
  | GetDocumentDataSuccess
  | GetDocumentDataFailure
  | ChangeTab;
