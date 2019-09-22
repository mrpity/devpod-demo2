import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ContentTypeEnum, Result, ResultsPagination } from '../models/result.model';
import { Observable } from 'rxjs';
import { ResultsEntityState } from '../store/reducers/results.reducer';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '@app/shared/services/helpers.service';
import { FiltersState } from '@app/search/store/reducers/filters.reducer';
import * as moment from 'moment';
import { FiltersSelectors, ResultsSelectors } from '@app/search/store/selectors';
import { PostActions, ProfileActions, ResultsActions, WebPageActions } from '@app/search/store/actions';
import { SearchState } from '@app/search/store/reducers';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  resultList$: Observable<Result[]> = this.store$.pipe(
    select(
      ResultsSelectors.selectAllResults
    ),
    filter(results => !!results)
  );

  resultListLength$: Observable<number> = this.store$.pipe(
    select(
      ResultsSelectors.getResultsTotal
    )
  );

  isResultsLoading$: Observable<boolean> = this.store$.pipe(
    select(
      ResultsSelectors.getIsResultsLoading
    )
  );

  isResultsLoadingFailure$: Observable<boolean> = this.store$.pipe(
    select(
      ResultsSelectors.getIsResultsLoadingFailure
    )
  );

  searchListQuery$: Observable<ResultsPagination> = this.store$.pipe(
    select(
      ResultsSelectors.getSearchListQuery
    )
  );

  isSpinner$: Observable<boolean> = this.store$.pipe(
    select(
      ResultsSelectors.getIsSpinner
    )
  );

  filtersState$: Observable<FiltersState> = this.store$.pipe(
    select(
      FiltersSelectors.getFiltersState
    )
  );

  searchDate: string;
  element: Element;
  fragment: string;
  constructor(
    private store$: Store<SearchState>,
    private router: Router,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    this.resultList$.subscribe(() => {
      return this.searchDate = moment().format('HH:mm DD.MM.YYYY');
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(f => {
      this.fragment = f;
    });
  }

  ngAfterViewChecked() {
    try {
      if (this.element) {
        return;
      }
      const element: HTMLElement = this.elementRef.nativeElement;
      const selector = `[id="${this.fragment}"]`;
      this.element = element.querySelector(selector) || null;
      if (this.fragment && element) {
        if (!this.helpers.isElementInViewport(element) && this.element) {
          this.element.scrollIntoView();
        }
      }
    } catch (error) {
      console.log('ERROR ', error);
    }
  }

  resultsPaginationChange(ev: any) {
    this.store$.dispatch(
      new ResultsActions.ChangePagination({
        pageNumber: ev.pageIndex,
        pageSize: ev.pageSize
      })
    );
  }

  /**
   * Remove "switch" after finish with all detail components
   */
  openUrl(result: Result) {
    switch (result.contentType) {
      case ContentTypeEnum.post: {
        this.store$.dispatch(
          new PostActions.OpenDetails({ result, route: this.route })
        );
        break;
      }
      case ContentTypeEnum.profile: {
        this.store$.dispatch(
          new ProfileActions.OpenDetails({ result, route: this.route })
        );
        break;
      }
      case ContentTypeEnum.webpage: {
        this.store$.dispatch(
          new WebPageActions.OpenDetails({ result, route: this.route })
        );
        break;
      }
      default: {
        window.open(result.resourceLink, '_blank');
        break;
      }
    }
  }
}
