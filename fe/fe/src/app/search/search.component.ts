import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RequestListItem, requestsQuery } from '@app/search/models/request.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { FiltersComponent } from '@app/search/filters/filters.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FiltersState } from '@app/search/store/reducers/filters.reducer';
import { RequestsState } from '@app/search/store/reducers/requests.reducer';
import { RequestsActions, ResultsActions } from '@app/search/store/actions';
import { ButtonsSelectors, FiltersSelectors, RequestsSelectors, ResultsSelectors } from '@app/search/store/selectors';
import { SearchState } from '@app/search/store/reducers';
import { RootStoreSelectors } from '@app/store';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { OpenCancelDialog } from '@app/search/store/actions/requests.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject();
  filtersData$: Observable<FiltersState> = this.store$.pipe(
    select(
      FiltersSelectors.getFiltersState
    )
  );

  buttonsData$: Observable<any> = this.store$.pipe(
    select(
      ButtonsSelectors.getButtonsData
    )
  );

  requestData$: Observable<Partial<RequestsState>> = this.store$.pipe(
    select(
      RequestsSelectors.getRequestsData
    )
  );

  searchRequestList$: Observable<RequestListItem[]> = this.store$.pipe(
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
  defaultDialogConfig = {
    panelClass: 'mat-custom-dialog',
    id: 'd_confirmDialog',
    data: {
      title: _('search.external.cancelExternalSearchTitle'),
      message: _('search.external.cancelMessage'),
      confirmBtn: _('general.confirmBtn'),
      cancelBtn: _('general.cancelBtn'),
    }
  };

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(FiltersComponent, { static: false }) filtersComponent: FiltersComponent;

  constructor(
    private translate: TranslateService,
    private store$: Store<SearchState>,
    private helpersService: HelpersService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

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
      map(({ reqPage }) => this.reqPage = +reqPage),
      filter((page) => !(page >= 0)),
      tap(() => this.isResultsFiltersDisabled ? this.newSearch() : ''),
      tap(() => this.requestsPaginationChange({ pageIndex: requestsQuery.pageNumber }))
    ).subscribe();


    /** reqPage queryParam exceeds totalPageNumber, navigate to last page */
    this.getTotalRequestsPages$.pipe(
      takeUntil(this._unsubscribe$),
      filter(total => Boolean(total)),
      map(total => --total),
      filter((total) => this.reqPage > total),
      tap((total) => this.requestsPaginationChange({ pageIndex: total }))).subscribe();

  }

  requestsPaginationChange(ev: any) {
    return this.store$.dispatch(
      new RequestsActions.ChangePagination({ pageNumber: ev.pageIndex })
    );
  }

  saveSearch(filters) {
    const { query, ...rest } = filters;
    this.store$.dispatch(
      new RequestsActions.SaveRequest({
        query,
        filter: rest,
        zoneOffset: this.helpersService.getCurrentOffsetValue(),
        searchDate: this.helpersService.getCurrentUtcDate()
      })
    );
  }

  getNew() {
    this.store$.dispatch(new RequestsActions.ExternalRequest());
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

  /** Clear filter form and navigate to app/search with empty queryParams */
  newSearch() {
    this.resetFilters();
    this.store$.dispatch(new ResultsActions.ClearFilters());
    this.router.navigate(['/app/search'], {
      queryParams: {},
    });
  }

  cancelExternalSearch() {
    this.store$.dispatch(new OpenCancelDialog(this.defaultDialogConfig));
  }


  ngOnDestroy() {
    this._unsubscribe$.next();
    if (!this.url.includes('/app/search/')) {
      this.store$.dispatch(new ResultsActions.ClearFilters());
    }
  }
}
