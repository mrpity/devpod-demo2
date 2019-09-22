import { DataSourceType } from '../search.enums';
import { SearchFilterInput } from '@app/search/models/request.model';
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
  searchDate?: string;
  zoneOffset?: string;
}

export enum ResultTypesEnum {
  PROFILE = 'PROFILE',
  POST = 'POST',
  GROUP = 'GROUP'
}
