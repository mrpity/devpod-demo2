import { Action } from '@ngrx/store';
import { AvatarConnection, AvatarProxy } from '../../models/avatar.model';
import { AvatarConnectionStatus } from '@app/avatar/avatar.enums';

export enum ActionTypes {
  LOAD_CONNECTIONS_REQUEST = '[Avatar][Connections] Load Connections Request',
  LOAD_CONNECTIONS_FAILURE = '[Avatar][Connections] Load Connections Failure',
  LOAD_CONNECTIONS_SUCCESS = '[Avatar][Connections] Load Connections Success',
  // UPDATE_FACEBOOK_CONNECTION_REQUEST = '[Avatar][Connections] Update Facebook Request',
  // UPDATE_ODNOKLASSNIKI_CONNECTION_REQUEST = '[Avatar][Connections] Update Odnoklassniki Request',
  // UPDATE_GOOGLE_CONNECTION_REQUEST = '[Avatar][Connections] Update Google Request',
  // UPDATE_WRONG_TYPE_CONNECTION_REQUEST = '[Avatar][Connections] Update Wrong Type Request',
  // UPDATE_CONNECTIONS_REQUEST = '[Avatar][Connections] Update Connection Request',
  // UPDATE_CONNECTIONS_FAILURE = '[Avatar][Connections] Update Connection Failure',
  // UPDATE_CONNECTIONS_SUCCESS = '[Avatar][Connections] Update Connection Success',
  UPDATE_CONNECTION_WRONG_CREDENTIALS = '[Avatar][Connections] Update Connection Wrong Credentials',
  UPDATE_CONNECTION_START_REQUEST = '[Avatar][Connections] Start Update Connection Request',
  UPDATE_CONNECTION_START_SUCCESS = '[Avatar][Connections] Start Update Connection Success',
  UPDATE_CONNECTION_START_FAILURE = '[Avatar][Connections] Start Update Connection Failure',
  UPDATE_CONNECTION_COMPLETE = '[Avatar][Connections] Complete Update Connection',
  UPDATE_CONNECTION_COMPLETE_SUCCESS = '[Avatar][Connections] Complete Update Connection Success',
  UPDATE_CONNECTION_COMPLETE_FAILURE = '[Avatar][Connections] Complete Update Connection Failure',
}

export class LoadConnectionsRequest implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadConnectionsFailure implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadConnectionsSuccess implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_SUCCESS;
  constructor(public payload: {
    connections: AvatarConnection[],
    proxies: AvatarProxy[],
    avatarId: number
  }) {}
}

// export class UpdateConnectionRequest implements Action {
//   readonly type = ActionTypes.UPDATE_CONNECTIONS_REQUEST;
//   constructor(public payload: {
//     connection: AvatarConnection,
//     connectionId: string,
//     id: number
//   }) {}
// }

// export class UpdateConnectionFacebookRequest implements Action {
//   readonly type = ActionTypes.UPDATE_FACEBOOK_CONNECTION_REQUEST;
//   constructor(public payload: {
//     connection: AvatarConnection,
//     connectionId: string,
//     id: number
//   }) {}
// }

// export class UpdateConnectionOdnoklassnikiRequest implements Action {
//   readonly type = ActionTypes.UPDATE_ODNOKLASSNIKI_CONNECTION_REQUEST;
//   constructor(public payload: {
//     connection: AvatarConnection,
//     connectionId: string,
//     id: number
//   }) {}
// }

// export class UpdateConnectionGoogleRequest implements Action {
//   readonly type = ActionTypes.UPDATE_GOOGLE_CONNECTION_REQUEST;
//   constructor(public payload: {
//     connection: AvatarConnection,
//     connectionId: string,
//     id: number
//   }) {}
// }

// export class UpdateConnectionFailure implements Action {
//   readonly type = ActionTypes.UPDATE_CONNECTIONS_FAILURE;
//   constructor(public payload: {
//     error: any,
//     connectionId: string
//   }) {}
// }

// export class UpdateConnectionWrongTypeRequest implements Action {
//   readonly type = ActionTypes.UPDATE_WRONG_TYPE_CONNECTION_REQUEST;
//   constructor() {}
// }


export class UpdateConnectionWrongCredentials implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_WRONG_CREDENTIALS;
  constructor(public payload: {
    error: any,
    connection: AvatarConnection,
    connectionId: string,
    snType: string
  }) {}
}

export class UpdateConnectionStartRequest implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_START_REQUEST;
  constructor(public payload: {
    connection: AvatarConnection,
    connectionId: string,
    avatarId: number
  }) {}
}

export class UpdateConnectionStartFailure implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_START_FAILURE;
  constructor(public payload: {
    error: any,
    snType: string,
    avatarId: number
  }) {}
}

export class UpdateConnectionStartSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_START_SUCCESS;
  constructor(public payload: {
    connection: AvatarConnection,
    connectionId: string,
    enabled: boolean,
    avatarId: number
  }) {}
}

export class UpdateConnectionComplete implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_COMPLETE;
  constructor(public payload: {
    avatarId: number,
    error: any,
    snType: string,
    state: AvatarConnectionStatus
  }) {}
}

export class UpdateConnectionCompleteFailure implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_COMPLETE_FAILURE;
  constructor(public payload: {
    avatarId: number,
    error: any,
    snType: string,
    state: AvatarConnectionStatus
  }) {}
}

export class UpdateConnectionCompleteSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTION_COMPLETE_SUCCESS;
  constructor(public payload: {
    avatarId: number,
    error: any,
    snType: string,
    state: AvatarConnectionStatus
  }) {}
}

export type Actions =
  LoadConnectionsRequest
  | LoadConnectionsFailure
  | LoadConnectionsSuccess
  | UpdateConnectionStartRequest
  | UpdateConnectionStartFailure
  | UpdateConnectionStartSuccess
  | UpdateConnectionComplete
  | UpdateConnectionCompleteSuccess
  | UpdateConnectionCompleteFailure
  | UpdateConnectionWrongCredentials;
  // UpdateConnectionRequest | UpdateConnectionFailure | UpdateConnectionSuccess | UpdateConnectionWrongCredentials |
  // UpdateConnectionOdnoklassnikiRequest | UpdateConnectionFacebookRequest | UpdateConnectionWrongTypeRequest;
