import {ResultTypesEnum} from '@app/search/models/result.model';

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
  searchDate: string;
  zoneOffset: string;
  resourceTypes: string[];
  externalSearch: Partial<ExternalSearchDetailsOutput>;
}

export interface GetRequestOutput {
  id: number;
  query: string;
  searchDate: string;
  zoneOffset: string;
  filter: SearchFilterInput;
  externalSearch: Partial<ExternalSearchDetailsOutput>;
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
  resourceTypes?: ResourceTypesEnum[];
  resultTypes?: ResultTypesEnum[];
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
    field: 'searchDate'
  },
  pageSize: 20
};

