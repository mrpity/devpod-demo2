import { Injectable } from '@angular/core';
import { ExternalSearchStatus } from '@app/analytic/models/analytic-request.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticExternalStatusService {
  isLoading(currentType: ExternalSearchStatus): boolean {
    return [
      ExternalSearchStatus.NEW,
      ExternalSearchStatus.SEARCHING
    ].includes(currentType);
  }
  isFinished(currentType: ExternalSearchStatus) {
    return [
      ExternalSearchStatus.SUCCEEDED,
      ExternalSearchStatus.FAILED
    ].includes(currentType);
  }
  isCancelled(currentType: ExternalSearchStatus) {
    return this.isLoading(currentType) || currentType === ExternalSearchStatus.CANCELLED;
  }
}
