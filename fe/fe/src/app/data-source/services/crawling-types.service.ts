import { Injectable } from '@angular/core';
import { DataSourceType } from '../data-source.enums';
import { ContentTypeEnum } from '@app/search/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class CrawlingTypesService {
  byUrl(currentType: DataSourceType) {
    return [
      DataSourceType.WEB_GENERAL,
      DataSourceType.FB_POST,
      DataSourceType.OK_POST
    ].includes(currentType);
  }

  byProfile(currentType: DataSourceType) {
    return [
      DataSourceType.FB_PROFILE,
      DataSourceType.FB_TIMELINE,
      DataSourceType.FB_GROUP,
      DataSourceType.OK_PROFILE,
      DataSourceType.OK_TIMELINE
    ].includes(currentType);
  }

  byAvatarCredentials(currentType: DataSourceType) {
    return [
      DataSourceType.FB_PROFILE,
      DataSourceType.FB_TIMELINE,
      DataSourceType.FB_GROUP,
      DataSourceType.OK_PROFILE,
      DataSourceType.OK_TIMELINE,
      DataSourceType.FB_POST,
      DataSourceType.OK_POST
    ].includes(currentType);
  }

  byDocumentType(contentType: ContentTypeEnum) {
    return [
      ContentTypeEnum.profile,
      ContentTypeEnum.post,
      ContentTypeEnum.webpage,
    ].includes(contentType);
  }
}
