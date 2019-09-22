import { DataSourceType } from '../search.enums';
import { ReactionOutput, StatisticsOutput } from '@app/search/models/result.model';

export interface DetailsTypeInput {
  documentId: string;
  index: string;
  type: string;
}

export interface CommentOutput {
  answerToUserUrl?: string;
  authorName?: string;
  authorUrl?: string;
  body?: string;
  creationDateTime?: string;
  level?: number;
  reactions?: ReactionOutput[];
  updateDateTime?: string;
  url?: string;
}
export interface ProfileLinkOutput {
  name: string;
  url: string;
}

export interface PostOutput {
  comments?: CommentOutput[];
  reposts?: ProfileLinkOutput[];
  commentsCount?: number;
  crawlingDate?: string;
  documentId?: string;
  index?: string;
  keywords?: string[];
  postDate?: string;
  reactions?: [ReactionOutput];
  repostsCount?: number;
  resourceLink?: string;
  statistics?: [StatisticsOutput];
  summary?: string;
  title?: string;
  type?: DataSourceType;
  dates: string[];
  emails: string[];
  hashtags: string[];
  locations: string[];
  organizations: string[];
  persons: string[];
  phones: string[];
  sharedPostLink: string;
  urls: string[];
  users: string[];
  authorFeeling: string;
  authorName: string;
  authorUrl: string;
  crawledBy: string;
  sentimentLabel: string;
}

export interface PostDocumentInput {
  documentId: string;
  index: string;
}

export interface ResultDocumentInput {
  documentId: string;
  index: string;
}

export enum PostTabsEnum {
  general,
  origin
}

export enum ProfileTabsEnum {
  general,
  friends
}

export enum WebPageTabsEnum {
  general,
  origin
}

export interface OriginPagination {
  pageNumber: number;
  pageSize: number;
}

export interface PostDetailsParams {
  index: string;
  documentId: string;
  tabs: string;
}

export enum NerFieldsPostEnum {
  sentimentLabel = 'sentimentLabel',
  dates = 'dates',
  locations = 'locations',
  hashtags = 'hashtags',
  organizations = 'organizations',
  phones = 'phones',
  urls = 'urls'
}
