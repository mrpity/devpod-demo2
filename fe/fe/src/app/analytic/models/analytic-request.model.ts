import { ResultTypesEnum, ScaleEnum } from '@app/analytic/models/analytic-result.model';

export interface RequestsPagination {
  pageNumber: number;
  pageSize?: number;
}

export interface SortInput {
  order: string;
  field: string;
}

export interface RequestListQuery {
  pageNumber: number;
  sorting: SortInput;
  pageSize: number;
}

export interface RequestListItem {
  id: number;
  query: string;
  requestDate: string;
  zoneOffset: string;
  resourceType: ResourceTypesEnum;
}

export interface GetRequestOutput {
  id: number;
  query: string;
  requestDate: string;
  zoneOffset: string;
  filter: SearchFilterInput;
}

export interface SearchRequestListQueryOutput {
  items: RequestListItem[];
  totalItemCount: number;
}

export enum ExternalSearchStatus {
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  NEW = 'NEW',
  SEARCHING = 'SEARCHING',
  SUCCEEDED = 'SUCCEEDED'
}

export interface SearchFilterInput {
  scale?: ScaleEnum;
  toDate?: string;
  fromDate?: string;
}

export enum ResourceTypesEnum {
  WEB = 'WEB',
  FB = 'FB',
  OK = 'OK'
}

export interface ExternalSearchDetailsOutput {
  countToProcess?: number;
  totalResultsCount?: number;
  status?: ExternalSearchStatus;
}

export interface ExternalCompletedOutput {
  id: number;
  status: ExternalSearchStatus;
  countToProcess: number;
}


export const requestsQuery = {
  pageNumber: 0,
  sorting: {
    order: 'DESC',
    field: 'requestDate'
  },
  pageSize: 20
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

