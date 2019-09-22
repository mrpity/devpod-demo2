import { Action } from '@ngrx/store';
import { AvatarDetails } from '../../models/avatar.model';

export enum ActionTypes {
  CREATE_NEW_REQUEST = '[Avatar][Create] New Avatar Request',
  CREATE_NEW_FAILURE = '[Avatar][Create] New Avatar Failure',
  CREATE_NEW_SUCCESS = '[Avatar][Create] New Avatar Success',
  CREATE_FORM_INVALID = '[Avatar][Create/Edit] Form Invalid',
  UPDATE_REQUEST = '[Avatar][Edit] Update Avatar Request',
  UPDATE_FAILURE = '[Avatar][Edit] Update Avatar Failure',
  UPDATE_SUCCESS = '[Avatar][Edit] Update Avatar Success',
  LOAD_DETAILS_REQUEST = '[Avatar][Details] Load Main Info Request',
  LOAD_DETAILS_FAILURE = '[Avatar][Details] Load Main Info Failure',
  LOAD_DETAILS_SUCCESS = '[Avatar][Details] Load Main Info Success'
}

export class CreateRequest implements Action {
  readonly type = ActionTypes.CREATE_NEW_REQUEST;
  constructor(public payload: object) {}
}

export class CreateFailure implements Action {
  readonly type = ActionTypes.CREATE_NEW_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CREATE_NEW_SUCCESS;
  constructor() {}
}

export class UpdateRequest implements Action {
  readonly type = ActionTypes.UPDATE_REQUEST;
  constructor(public payload: object) {}
}

export class UpdateFailure implements Action {
  readonly type = ActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: number) {}
}

export class FormInvalid implements Action {
  readonly type = ActionTypes.CREATE_FORM_INVALID;
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

export class LoadDetailsRequest implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadDetailsFailure implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadDetailsSuccess implements Action {
  readonly type = ActionTypes.LOAD_DETAILS_SUCCESS;
  constructor(public payload: AvatarDetails) {}
}


export type Actions =
  CreateRequest | CreateFailure | CreateSuccess |
  FormInvalid |
  UpdateRequest | UpdateFailure | UpdateSuccess |
  LoadDetailsRequest | LoadDetailsFailure | LoadDetailsSuccess;
