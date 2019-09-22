import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FiltersState } from '@app/analytic/store/reducers/analytic-filters.reducer';
import { select, Store } from '@ngrx/store';
import { FiltersSelectors, RequestsSelectors, ResultsSelectors } from '@app/analytic/store/selectors';
import { RequestsState } from '@app/analytic/store/reducers/analytic-requests.reducer';
import { RequestListItem, requestsQuery } from '@app/analytic/models/analytic-request.model';
import { RootStoreSelectors } from '@app/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { AnalyticFiltersComponent } from '@app/analytic/filters/analytic-filters.component';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticState } from '@app/analytic/store/reducers';
import { HelpersService } from '@app/shared/services/helpers.service';
import { RequestsActions, ResultsActions } from '@app/analytic/store/actions';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject();
  filtersData$: Observable<FiltersState> = this.store$.pipe(
    select(
      FiltersSelectors.getFiltersState
    )
  );

  requestData$: Observable<Partial<RequestsState>> = this.store$.pipe(
    select(
      RequestsSelectors.getRequestsData
    )
  );

  analyticRequestList$: Observable<RequestListItem[]> = this.store$.pipe(
    select(
      RequestsSelectors.selectAllRequests
    )
  );

  routeQueryParams$: Observable<any> = this.store$.pipe(
    select(
      RootStoreSelectors.getRouterQueryParams
    )
  );

  routeParams$: Observable<Params> = this.store$.pipe(
    select(
      RootStoreSelectors.getRouterParams
    )
  );

  isResultsLoadingFailure$: Observable<boolean> = this.store$.pipe(
    select(
      ResultsSelectors.getIsResultsLoadingFailure
    )
  );

  isRequestsLoaded$: Observable<boolean> = this.store$.pipe(
    select(
      RequestsSelectors.getIsRequestsLoaded
    )
  );

  getTotalRequestsPages$: Observable<number> = this.store$.pipe(
    select(
      RequestsSelectors.getTotalPages
    )
  );

  getRouterUrl$: Observable<string> = this.store$.pipe(
    select(
      RootStoreSelectors.getRouterUrl
    )
  );

  getIsResultsFiltersDisabled$: Observable<boolean> = this.store$.pipe(
    select(
      FiltersSelectors.getIsResultsFiltersDisabled
    )
  );

  url: string;
  reqPage: number;
  isRequestsLoaded: boolean;
  isResultsFiltersDisabled: boolean;

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(AnalyticFiltersComponent, { static: false }) filtersComponent: AnalyticFiltersComponent;

  constructor( private translate: TranslateService,
               private store$: Store<AnalyticState>,
               private helpersService: HelpersService,
               public router: Router,
               public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouterUrl$.subscribe(data => this.url = data);
    this.isRequestsLoaded$.subscribe(data => this.isRequestsLoaded = data);
    this.getIsResultsFiltersDisabled$.subscribe(data => this.isResultsFiltersDisabled = data);

    /** Get requests first time */
    if (!this.isRequestsLoaded) {
      this.store$.dispatch(new RequestsActions.RefreshRequests());
    }

    /** if url doesn't contain reqPage queryParam, navigate to first page and clear filters */
    this.route.queryParams.pipe(
      takeUntil(this._unsubscribe$),
      map(({reqPage}) => this.reqPage = +reqPage),
      filter((page) => !(page >= 0)),
      tap(() => this.isResultsFiltersDisabled ? this.newSearch() : ''),
      tap(() => this.requestsPaginationChange({pageIndex: requestsQuery.pageNumber}))
    ).subscribe();


    /** reqPage queryParam exceeds totalPageNumber, navigate to last page */
    this.getTotalRequestsPages$.pipe(
      takeUntil(this._unsubscribe$),
      filter(total => Boolean(total)),
      map(total => --total),
      filter((total) => this.reqPage > total),
      tap((total) => this.requestsPaginationChange({pageIndex: total}))).subscribe();

  }

  requestsPaginationChange(ev: any) {
    return this.store$.dispatch(
      new RequestsActions.ChangePagination({pageNumber: ev.pageIndex})
    );
  }

  saveSearch(filters) {
    const {query, scale, datePeriod} = filters;
    this.store$.dispatch(
      new RequestsActions.SaveRequest({
        query,
        filter: {scale, ...datePeriod},
        zoneOffset: this.helpersService.getCurrentOffsetValue(),
        requestDate: this.helpersService.getCurrentUtcDate()
      })
    );
  }

  resetFilters() {
    return this.filtersComponent.form ? this.filtersComponent.form.reset() : false;
  }

  showRequestDetails(request: RequestListItem) {
    this.router.navigate([request.id, 'results'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }

  /** Clear filter form and navigate to app/analytic with empty queryParams */
  newSearch() {
    this.resetFilters();
    this.store$.dispatch(new ResultsActions.ClearFilters());
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }

}
