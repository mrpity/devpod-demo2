import {ProxyProtocol} from '@app/proxy/models/proxy-protocol.enum';

export interface Proxy {
  id: number;
  country: string;
  protocol: string;
  host: string;
  port: number;
  description: string;
}

export interface ProxyAddModel {
  credentials: ProxyCredentialsModel;
  type: any;
  url: ProxyUrlModel;
  description: string;
}

export interface ProxyUpdateModel {
  credentials: ProxyCredentialsModel;
  country: string;
  url: ProxyUrlModel;
  description: string;
  id: number;
}

export interface ProxyDetailsModel {
  credentials: ProxyCredentialsModel;
  country: string;
  city?: string;
  type: string;
  url: ProxyUrlModel;
  description: string;
  id: number;
}

export interface ProxyCredentialsModel {
  password: string;
  login: string;
}

export interface ProxyUrlModel {
  protocol: string;
  host: string;
  port: number;
}

export interface Countries {
  value: string[];
}


export interface ProxyListModel {
  proxies: Proxy[];
  totalItemCount: number;
}

export interface ProxyListQueryModel {
  searchQuery: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: ProxySortByModel;
}

interface ProxySortByModel {
  field: string;
  asc: boolean;
}

export interface ProxyLocationInput  {
  proxyCredentials: ProxyCredentialsInput;
  proxyUrl: ProxyUrlInput;
}

export interface ProxyCredentialsInput  {
  password: string;
  login: string;
}

export interface ProxyUrlInput {
  host: string;
  post: number;
  protocol: ProxyProtocol;
}
