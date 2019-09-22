import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RequestListItem, requestsQuery } from '@app/analytic/models/analytic-request.model';
import { RequestsState } from '@app/analytic/store/reducers/analytic-requests.reducer';
import { Params } from '@angular/router';


@Component({
  selector: 'app-analytic-requests',
  templateUrl: './analytic-requests.component.html',
  styleUrls: ['./analytic-requests.component.scss']
})
export class AnalyticRequestsComponent implements OnInit {
  @Input()
  requestList: RequestListItem[];

  @Input()
  requestsData: Partial<RequestsState>;

  @Input()
  routeParams: Params;

  @Input()
  routeQueryParams: any;

  get requestsTotal() {
    return this.requestsData.requestsTotal;
  }

  @Output()
  showDetails = new EventEmitter();

  @Output()
  paginationChange = new EventEmitter();

  @Output()
  newSearch = new EventEmitter();

  clickDetailsStream$ = new Subject();

  pageSize = requestsQuery.pageSize;
  constructor() {}

  ngOnInit() {
    this.clickDetailsStream$.pipe(
      filter((request: RequestListItem) => request.id !== this.routeParams.id),
    ).subscribe(request => this.showDetails.emit(request));
  }

  isSelected(id: number): boolean {
    return +this.routeParams.id === id;
  }
}
