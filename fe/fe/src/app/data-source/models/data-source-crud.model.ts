import { AutomationRule } from './automation-rule.model';
import { DataSourceType } from '@app/search/search.enums';
import { DataSourceStatus } from '@app/data-source/data-source.enums';
import { ContentTypeEnum } from '@app/search/models/result.model';
import { PostOutput } from '@app/search/models/post.model';
import { WebPageOutput } from '@app/search/models/webpage.model';
import { ProfileOutput } from '@app/search/models/profile.model';

export interface DataSourceCreateInterface {
  type: string;
  url?: string;
  profileId?: string;
  proxyCountryCode: string;
  proxyCity?: string;
  enabled: boolean;
  depth: number;
  automationRules: any;
  crawlMedia: boolean;
}

export class DataSourceCreate implements DataSourceCreateInterface {
  automationRules: any;
  enabled: boolean;
  proxyCountryCode: string;
  proxyCity?: string;
  type: string;
  url: string;
  profileId: string;
  depth: number;
  crawlMedia: boolean;

  constructor(
    automationRules: any,
    enabled: boolean,
    proxyCountryCode: string,
    type: string,
    url: string,
    profileId: string,
    depth: number,
    crawlMedia: boolean,
    proxyCity?: string
  ) {
    this.automationRules = automationRules;
    this.enabled = enabled;
    this.proxyCountryCode = proxyCountryCode;
    this.proxyCity = proxyCity;
    this.type = type;
    this.url = url;
    this.profileId = profileId;
    this.depth = depth;
    this.crawlMedia = crawlMedia;
  }
}

export interface DataSourceEditInterface {
  type: string;
  url?: string;
  id: number;
  profileId?: string;
  proxyCountryCode: string;
  proxyCity?: string;
  enabled: boolean;
  crawlMedia: boolean;
  automationRules: any;
}

export class DataSourceEdit implements DataSourceEditInterface {
  automationRules: any;
  enabled: boolean;
  proxyCountryCode: string;
  proxyCity: string;
  type: string;
  url: string;
  profileId: string;
  id: number;
  depth: number;
  crawlMedia: boolean;

  constructor(
    automationRules: any,
    enabled: boolean,
    proxyCountryCode: string,
    type: string,
    url: string,
    profileId: string,
    id: number,
    depth: number,
    crawlMedia: boolean,
    proxyCity?: string,
  ) {
    this.automationRules = automationRules;
    this.enabled = enabled;
    this.proxyCountryCode = proxyCountryCode;
    this.proxyCity = proxyCity;
    this.type = type;
    this.url = url;
    this.profileId = profileId;
    this.id = id;
    this.depth = depth;
    this.crawlMedia = crawlMedia;
  }
}

export interface DataSourceDetailInterface {
  automationRules: (AutomationRule | null)[];
  createdAt: string;
  createdBy: string;
  enabled: boolean;
  id: number;
  profileId?: string;
  proxyCountryCode: string;
  proxyCountry?: string;
  type: DataSourceType;
  url?: string;
  contentType: ContentTypeEnum;
  index: string;
  documentId: string;
}

export interface DataSourceStatisticOutput {
  total: string;
  succeeded: string;
  failed: number;
  sessions: DataSourceLogOutput[];
}

export interface DataSourceLogOutput {
  message: string;
  messageKey: MessageKey;
  resource: string;
  avatarFullName: string;
  status: DataSourceStatus;
  updatedAt: string;
  resourceLogs: DataSourceLogOutput[];
  id?: number;
  parent?: number;
  level?: number;
  expanded?: boolean;
}

export interface ProxyRegionInterface {
  cities: string[];
  country: string;
  countryCode: string;
}

export enum MessageKey {
  NEW = 'NEW',
  CRAWLING = 'CRAWLING',
  CRAWLED = 'CRAWLED',
  CRAWLING_FAILED = 'CRAWLING_FAILED',
  PIPELINE_FAILED = 'PIPELINE_FAILED',
  SUCCEEDED = 'SUCCEEDED',
  DEDUPLICATED = 'DEDUPLICATED',
  NO_PROXY = 'NO_PROXY',
  BAD_PROXY = 'BAD_PROXY',
  TIMEOUT = 'TIMEOUT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_BLOCKED = 'ACCOUNT_BLOCKED',
  UNSPECIFIED = 'UNSPECIFIED'
}

export enum DetailsTabsEnum {
  general,
  statistics,
  document
}

export interface DocumentInfoOutput {
  documentId: string;
  index: string;
  contentType: ContentTypeEnum;
}

export type DocumentDataType = PostOutput | WebPageOutput | ProfileOutput | {};
