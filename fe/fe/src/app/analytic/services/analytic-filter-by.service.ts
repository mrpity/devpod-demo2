import { Injectable } from '@angular/core';
import { ResourceTypesEnum } from '@app/analytic/models/analytic-request.model';
import { DataSourceType } from '../analytic.enums';
import { ResultTypesEnum } from '@app/analytic/models/analytic-result.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticFilterByService {
  byResourceType(currentType: ResourceTypesEnum[]) {
    return currentType
      ? currentType.includes(ResourceTypesEnum.OK)
      || currentType.includes(ResourceTypesEnum.FB)
      : false;
  }

  byResultType(currentType: ResultTypesEnum[]) {
    return currentType
      ? currentType.includes(ResultTypesEnum.POST)
      || currentType.includes(ResultTypesEnum.GROUP)
      || currentType.includes(ResultTypesEnum.PROFILE)
      : false;
  }

  byPost(currentType: DataSourceType) {
    return [
      DataSourceType.FB_POST,
      DataSourceType.OK_POST,
    ].includes(currentType);
  }

  byWeb(currentType: DataSourceType) {
    return [
      DataSourceType.WEB_GENERAL,
    ].includes(currentType);
  }

  byProfile(currentType: DataSourceType) {
    return [
      DataSourceType.FB_PROFILE,
      DataSourceType.OK_PROFILE,
    ].includes(currentType);
  }

  currentType(type: DataSourceType) {
    if (this.byProfile(type)) {
      return 'profile';
    } else if (this.byWeb(type)) {
      return 'web';
    } else if (this.byPost(type)) {
      return 'post';
    }
  }
}
