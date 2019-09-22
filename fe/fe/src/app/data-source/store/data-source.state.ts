import {
  DataSource,
  DataSourceListQuery,
  DataSourceListStatuses,
} from '../models/data-source.model';
import {
  DataSourceDetailInterface,
  ProxyRegionInterface,
  DataSourceStatisticOutput, DocumentDataType, DocumentInfoOutput
} from '../models/data-source-crud.model';

export interface State {
  dataSources: DataSource[];
  dataSourcesTotal: number;
  listQuery: DataSourceListQuery;
  isLoading: boolean;
  listStatuses: DataSourceListStatuses;
  selectedGeneralInfo: DataSourceDetailInterface;
  selectedStatistics: DataSourceStatisticOutput;
  availableProxyRegions: ProxyRegionInterface[];
  failedGateway: boolean;
  documentData: DocumentDataType;
  documentInfo: DocumentInfoOutput;
  isDocumentCrawled: boolean;
  isDocumentLoading: boolean;
}

export const initialState: State = {
  dataSources: [],
  dataSourcesTotal: 0,
  listQuery: {
    pageNumber: 0,
    pageSize: 20,
    sortBy: {
      field: 'createdAt',
      asc: false
    },
    searchQuery: ''
  },
  isLoading: false,
  listStatuses: {},
  selectedGeneralInfo: undefined,
  selectedStatistics: undefined,
  availableProxyRegions: undefined,
  failedGateway: false,
  documentData: undefined,
  documentInfo: undefined,
  isDocumentCrawled: true,
  isDocumentLoading: false
};
