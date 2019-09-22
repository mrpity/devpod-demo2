import {Proxy, ProxyDetailsModel, ProxyListQueryModel} from '../models/proxy.interface';

export interface State {
  proxies: Proxy[];
  selectedProxies: number[];
  countries: string[];
  types: string[];
  proxiesTotal: number;
  listQuery: ProxyListQueryModel;
  selected: any;
  selectedDetails: ProxyDetailsModel;
  clearSelected: boolean;
  isLoading?: boolean;
  error?: any;
  isAddBtnDisabled?: boolean;
}

export const initialState: State = {
  proxies: [],
  selectedProxies:  [],
  countries: [],
  types: [],
  proxiesTotal: 0,
  listQuery: {
    pageNumber: 0,
    pageSize: 20,
    searchQuery: '',
    sortBy: {
      field: 'id',
      asc: false
    }
  },
  selected: undefined,
  selectedDetails: undefined,
  clearSelected: false,
  isLoading: false,
  error: null,
  isAddBtnDisabled: false
};
