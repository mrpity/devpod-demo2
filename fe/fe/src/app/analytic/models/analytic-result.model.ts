import { DataSourceType } from '../analytic.enums';
import { SearchFilterInput } from '@app/analytic/models/analytic-request.model';
import { CommentOutput, ProfileLinkOutput } from '@app/search/models/post.model';

export interface StatisticsOutput {
  sentiment: SentimentType;
}

export enum SentimentType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL'
}

export enum ContentTypeEnum {
  webpage = 'webpage',
  profile = 'profile',
  media = 'media',
  post = 'post',
  group = 'group'
}

export interface ReactionOutput {
  type: string;
  count: number;
  users: ProfileLinkOutput[];
}

export interface Result {
  id: string;
  crawlingDate: string;
  documentId: string;
  keywords: string[];
  postDate: string;
  resourceLink: string;
  statistics: StatisticsOutput[];
  summaryLines: string[];
  title: string;
  type: DataSourceType;
  contentType: ContentTypeEnum;
  index: string;
  reactions: ReactionOutput[];
  comments: CommentOutput[];
  reposts: ProfileLinkOutput[];
  repostsCount: number;
  commentsCount: number;
  label: ResultLabelEnum;
}

export enum ResultLabelEnum {
  NEW = 'NEW'
}

export interface ResultListModel {
  items: Result[];
  totalItemCount: number;
  id: number;
}


export interface ResultsPagination {
  pageNumber: number;
  pageSize: number;
}

export interface SearchSearchInput {
  id: number;
  pageNumber: number;
  pageSize: number;
}

export interface SearchRequestInput {
  query?: string;
  filter?: SearchFilterInput;
  requestDate?: string;
  zoneOffset?: string;
}

export interface AnalyticsFilterInput  {
  scale: ScaleEnum;
  fromDate: string;
  toDate: string;
}


export enum ResultTypesEnum {
  PROFILE = 'PROFILE',
  POST = 'POST',
  GROUP = 'GROUP'
}

export enum ScaleEnum {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}

export enum ScalePeriodEnum {
  days = 7,

}
