import {SentimentType} from '@app/search/models/result.model';
import {DataSourceType} from '@app/data-source/data-source.enums';

export interface WebPageOutput  {
  crawlingDate: string;
  dates: string[];
  documentId: string;
  emails: string[];
  hashtags: string[];
  index: string;
  keywords: string[];
  language: string;
  locations: string[];
  organizations: string[];
  persons: string[];
  publicationDate: string;
  publicationLink: string;
  phones: string[];
  sentimentLabel: SentimentType;
  sourceLink: string;
  summary: string;
  title: string;
  type: DataSourceType;
  urls: string[];
  users: string[];
}

export interface WebPageDetailsParams {
  index: string;
  documentId: string;
  tabs: string;
}

export enum NerFieldsWebPageEnum {
  sentimentLabel = 'sentimentLabel',
  language = 'language',
  dates = 'dates',
  locations = 'locations',
  hashtags = 'hashtags',
  organizations = 'organizations',
  phones = 'phones',
  persons = 'persons',
  emails = 'emails',
  users = 'users',
  urls = 'urls'
}
