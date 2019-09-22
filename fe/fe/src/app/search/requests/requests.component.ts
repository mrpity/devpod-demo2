import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ExternalStatusService} from '@app/search/services/external-status.service';
import {RequestListItem, requestsQuery} from '@app/search/models/request.model';
import {RequestsState} from '@app/search/store/reducers/requests.reducer';
import {Params} from '@angular/router';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
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
  constructor(public externalStatusService: ExternalStatusService) {}

  ngOnInit() {
    this.clickDetailsStream$.pipe(
      filter((request: RequestListItem) => request.id !== this.routeParams.id),
    ).subscribe(request => this.showDetails.emit(request));
  }

  isSelected(id: number): boolean {
    return +this.routeParams.id === id;
  }
}
