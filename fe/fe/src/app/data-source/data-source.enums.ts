export enum FormMode {
  ADD = 'ADD',
  EDIT = 'EDIT',
  IMPORT = 'IMPORT',
}

export enum DataSourceType {
  WEB_GENERAL = 'WEB_GENERAL',
  FB_GROUP = 'FB_GROUP',
  FB_PROFILE = 'FB_PROFILE',
  FB_TIMELINE = 'FB_TIMELINE',
  FB_POST = 'FB_POST',
  OK_PROFILE = 'OK_PROFILE',
  OK_TIMELINE = 'OK_TIMELINE',
  OK_POST = 'OK_POST'
}

export enum DataSourceStatus  {
  CRAWLED = 'CRAWLED',
  CRAWLING = 'CRAWLING',
  CRAWLING_FAILED = 'CRAWLING_FAILED',
  DEDUPLICATED = 'DEDUPLICATED',
  NEW = 'NEW',
  SUCCEEDED = 'SUCCEEDED'
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}
