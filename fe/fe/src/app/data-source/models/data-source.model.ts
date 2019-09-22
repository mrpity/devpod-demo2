import { DataSourceType, SortOrder } from '../data-source.enums';

export interface SourceData {
  id: number;
  crawledAt: string;
  crawledBy: string;
  createdAt: string;
  createdBy: string;
  status: string;
  type: string;
  url: string;
}

export interface DataSourcesBatchInput {
  resources: string[];
  type: DataSourceType;
  depth: number;
  proxyCountryCode: string;
}


export interface DataSource {
  crawledAt: string;
  crawledBy: string;
  createdAt: string;
  createdBy: string;
  enabled: boolean;
  id: number;
  status?: string;
  type: string;
  url: string;
}

export interface DataSourceList {
  dataSources: DataSource[];
  totalItemCount: number;
}

export interface DataSourceListStatuses {
  [id: number]: string;
}

interface DataSourceSortByModel {
  field: string;
  asc: boolean;
}

export interface DataSourceListQuery {
  pageNumber: number;
  pageSize: number;
  sortBy: DataSourceSortByModel;
  // filter: Partial<DataSourceFiltersModel>;
  searchQuery: string;
}

export interface SortQuery {
  field: string;
  order: SortOrder;
}

export interface DataSourceUpdatedData {
  datasourceId: number;
  status: DataSourceType;
  crawledAt: any;
  errorMessage: string;
}

export interface DataSourceFiltersModel {
  searchQuery: string;
}

export interface DataSourceGQLResponse {
  data: {
    addDataSource?,
    updateDataSource?,
    changeDataSourceState?
  };
}
