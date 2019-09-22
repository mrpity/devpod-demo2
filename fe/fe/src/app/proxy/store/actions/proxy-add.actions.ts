import { Action } from '@ngrx/store';
import {ProxyLocationInput} from '@app/proxy/models/proxy.interface';

export enum ActionTypes {
  ADD_NEW_REQUEST = '[Proxy][ADD] Add New Proxy Request',
  ADD_NEW_FAILURE = '[Proxy][ADD] Add New Proxy Failure',
  ADD_NEW_SUCCESS = '[Proxy][ADD] Add New Proxy Success',
  ADD_FORM_INVALID = '[Proxy][ADD/Edit] Form Invalid',
  GET_PROXY_SETTINGS_REQUEST = '[Proxy][ADD] Get Proxy Settings Request',
  GET_PROXY_SETTINGS_FAILURE = '[Proxy][ADD] Get Proxy Settings Failure',
  GET_PROXY_SETTINGS_SUCCESS = '[Proxy][ADD] Get Proxy Settings Success',
  OPEN_ADD_DIALOG = '[Proxy][ADD] Open Add Proxy Dialog',
  CLOSE_ADD_DIALOG = '[Proxy][Add] Close Add Proxy Dialog',
  FIND_LOCATION_BY_HOST_REQUEST = '[Proxy][Add] Find Location By Host Name Request',
  FIND_LOCATION_BY_HOST_FAILURE = '[Proxy][Add] Find Location By Host Name Failure',
  FIND_LOCATION_BY_HOST_SUCCESS = '[Proxy][Add] Find Location By Host Name Success',
}

export class AddRequest implements Action {
  readonly type = ActionTypes.ADD_NEW_REQUEST;
  constructor(public payload: object) {}
}

export class AddFailure implements Action {
  readonly type = ActionTypes.ADD_NEW_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AddSuccess implements Action {
  readonly type = ActionTypes.ADD_NEW_SUCCESS;
  constructor() {}
}

export class FindLocationByHostRequest implements Action {
  readonly type = ActionTypes.FIND_LOCATION_BY_HOST_REQUEST;
  constructor(public payload: ProxyLocationInput) {}
}

export class FindLocationByHostFailure implements Action {
  readonly type = ActionTypes.FIND_LOCATION_BY_HOST_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class FindLocationByHostSuccess implements Action {
  readonly type = ActionTypes.FIND_LOCATION_BY_HOST_SUCCESS;
  constructor(public payload: {
    country: string,
    countryCode: string,
    city: string
  }) {}
}

export class GetProxySettingsRequest implements Action {
  readonly type = ActionTypes.GET_PROXY_SETTINGS_REQUEST;
  constructor() {}
}

export class GetProxySettingsSuccess implements Action {
  readonly type = ActionTypes.GET_PROXY_SETTINGS_SUCCESS;
  constructor(public payload: {
    countries: any[],
    types: any[]
  }) {}
}

export class GetProxySettingsFailure implements Action {
  readonly type = ActionTypes.GET_PROXY_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class OpenAddDialog implements Action {
  readonly type = ActionTypes.OPEN_ADD_DIALOG;
  constructor(public payload: object) {}
}

export class CloseAddDialog implements Action {
  readonly type = ActionTypes.CLOSE_ADD_DIALOG;
  constructor() {}
}


export class FormInvalid implements Action {
  readonly type = ActionTypes.ADD_FORM_INVALID;
  constructor(public payload: any) {
    // Some code for show form errors if it needed
    // F.e.
    const errors = Object.keys(payload.controls)
      .reduce((res, field) => {
        if (payload.controls[field].errors) {
          res[field] = Object.keys(payload.controls[field].errors)
            .filter(error => payload.controls[field].errors[error]);
        }
        return res;
      }, {});
    console.log(errors);
  }
}

export type Actions =
  AddRequest
  | AddFailure
  | AddSuccess
  | FormInvalid
  | GetProxySettingsRequest
  | GetProxySettingsSuccess
  | GetProxySettingsFailure
  | OpenAddDialog
  | CloseAddDialog;
