import { Action } from '@ngrx/store';
import { SseResponseAvatarDataModel } from '@app/shared/models/sse-model';
import { AvatarExportSummary } from '@app/avatar/models/avatar-override-diff.model';

export enum ActionTypes {
  EXPORT_PREVIEW = '[Avatar][Export] Begin export process',
  EXPORT_DISCARD = '[Avatar][Export] Discard export process',
  EXPORT_START_REQUEST = '[Avatar][Export] Start Request',
  EXPORT_START_SUCCESS = '[Avatar][Export] Start Success',
  EXPORT_START_FAILURE = '[Avatar][Export] Start Failure',
  EXPORT_COMPLETE_SUCCESS = '[Avatar][Export] Complete Success',
  EXPORT_COMPLETE_FAILURE = '[Avatar][Export] Complete Failure',
  LOAD_EXPORT_SUMMARY_REQUEST = '[Avatar][Export] Load Summary Data Request',
  LOAD_EXPORT_SUMMARY_SUCCESS = '[Avatar][Export] Load Summary Data Success',
  LOAD_EXPORT_SUMMARY_FAILURE = '[Avatar][Export] Load Summary Data Failure',
  REVIEW_EXPORT_SUMMARY_REQUEST = '[Avatar][Export] Review Summary Data Request',
  REVIEW_EXPORT_SUMMARY_SUCCESS = '[Avatar][Export] Review Summary Data Success',
  REVIEW_EXPORT_SUMMARY_FAILURE = '[Avatar][Export] Review Summary Data Failure',
}

export class ExportStartRequest implements Action {
  readonly type = ActionTypes.EXPORT_START_REQUEST;
  constructor(public payload: {
    id: number,
    targets: string[],
    fields: string[]
  }) {}
}

export class ExportStartSuccess implements Action {
  readonly type = ActionTypes.EXPORT_START_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportStartFailure implements Action {
  readonly type = ActionTypes.EXPORT_START_FAILURE;
  constructor(public payload: any) {}
}

export class ExportCompleteSuccess implements Action {
  readonly type = ActionTypes.EXPORT_COMPLETE_SUCCESS;
  constructor(public payload: SseResponseAvatarDataModel) {}
}

export class ExportCompleteFailure implements Action {
  readonly type = ActionTypes.EXPORT_COMPLETE_FAILURE;
  constructor(public payload: SseResponseAvatarDataModel) {}
}

export class LoadExportSummaryRequest implements Action {
  readonly type = ActionTypes.LOAD_EXPORT_SUMMARY_REQUEST;
  constructor(public payload: {
    id: number
  }) {}
}

export class LoadExportSummarySuccess implements Action {
  readonly type = ActionTypes.LOAD_EXPORT_SUMMARY_SUCCESS;
  constructor(public payload: {
    id: number,
    summary: AvatarExportSummary[]
  }) {}
}

export class LoadExportSummaryFailure implements Action {
  readonly type = ActionTypes.LOAD_EXPORT_SUMMARY_FAILURE;
  constructor() {}
}

export class ReviewExportSummaryRequest implements Action {
  readonly type = ActionTypes.REVIEW_EXPORT_SUMMARY_REQUEST;
  constructor(public payload: {
    id: number
  }) {}
}

export class ReviewExportSummarySuccess implements Action {
  readonly type = ActionTypes.REVIEW_EXPORT_SUMMARY_SUCCESS;
  constructor(public payload: {
    id: number
  }) {}
}

export class ReviewExportSummaryFailure implements Action {
  readonly type = ActionTypes.REVIEW_EXPORT_SUMMARY_FAILURE;
  constructor() {}
}

export class ExportPreview implements Action {
  readonly type = ActionTypes.EXPORT_PREVIEW;
  constructor(public payload: {
    id: number
  }) {}
}

export class ExportPreviewDiscard implements Action {
  readonly type = ActionTypes.EXPORT_DISCARD;
  constructor(public payload: {
    id: number
  }) {}
}

export type Actions =
  ExportPreview
  | ExportPreviewDiscard
  | ExportStartRequest
  | ExportStartSuccess
  | ExportStartFailure
  | ExportCompleteSuccess
  | ExportCompleteFailure
  | LoadExportSummaryRequest
  | LoadExportSummarySuccess
  | LoadExportSummaryFailure
  | ReviewExportSummaryRequest
  | ReviewExportSummarySuccess
  | ReviewExportSummaryFailure;
