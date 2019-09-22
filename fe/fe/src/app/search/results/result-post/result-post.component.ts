import { Component, OnInit } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Observable, OperatorFunction } from 'rxjs';
import { PostDetailsParams, PostOutput, PostTabsEnum } from '@app/search/models/post.model';
import { select, Store } from '@ngrx/store';
import { PostsSelectors, ResultsSelectors } from '@app/search/store/selectors';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getRouterParams } from '@app/store/app.selectors';
import { ContentTypeEnum, Result } from '@app/search/models/result.model';
import { SearchState } from '@app/search/store/reducers';
import * as RootActions from '@app/store/actions';
import { PostActions, ResultsActions } from '@app/search/store/actions';
import { DataSourceType } from '@app/data-source/data-source.enums';
_('navigation.details');
_('navigation.index.posts');

@Component({
  selector: 'app-result-post',
  templateUrl: './result-post.component.html',
  styleUrls: ['./result-post.component.scss']
})
export class ResultPostComponent implements OnInit {

  resultDetails$: Observable<PostOutput> = this.store$.pipe(
    select(
      PostsSelectors.getResultDetails
    ),
    filter(post => !!post)
  );

  selectedId$: Observable<string> = this.store$.pipe(
    select(
      PostsSelectors.getSelectedId
    )
  );

  routerParams$: Observable<Params> = this.store$.pipe(
    select(getRouterParams)
  );

  isResultsLoadingFailure$: Observable<boolean> = this.store$.pipe(
    select(
      ResultsSelectors.getIsResultsLoadingFailure
    )
  );

  origins$: Observable<Result[]> = this.store$.pipe(
    select(
      PostsSelectors.getOrigins
    ),
  );

  isOriginsLoading$: Observable<boolean> = this.store$.pipe(
    select(
      PostsSelectors.getIsOriginsLoading
    ),
  );

  isPostGeneralLoading$: Observable<boolean> = this.store$.pipe(
    select(
      PostsSelectors.getIsPostGeneralLoading
    ),
  );

  isOriginsLoadingFailure$: Observable<boolean> = this.store$.pipe(
    select(
      PostsSelectors.getIsOriginsLoadingFailure
    ),
  );

  selectedResultId$: Observable<string> = this.store$.pipe(
    select(
      ResultsSelectors.getSelectedResultId
    ),
    filter(string => !!string)
  );

  selectedResultId: string;
  currentTabIndex: number;
  query: string;
  selectedId: string;
  resultDetailsData: PostOutput;
  routerParams: Params | PostDetailsParams;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store$: Store<SearchState>) { }

  ngOnInit() {
    this.routerParams$.pipe(
      filter(params => params && params.tabs)
    ).subscribe(params => {
      this.routerParams = params;
      const tabs: string = this.routerParams.tabs;
      this.currentTabIndex = PostTabsEnum[tabs];
    });

    this.selectedResultId$.subscribe(data => this.selectedResultId = data);

    this.resultDetails$.subscribe(result => this.resultDetailsData = result);

    this.selectedId$.subscribe(data => this.selectedId = data);
  }


  closeDetails() {
    this.selectedResultId !== this.selectedId
      ? this.store$.dispatch(new RootActions.RouterActions.RouterBack())
      : this.store$.dispatch(new ResultsActions.CloseDetails({ id: this.selectedId, route: this.route }));
  }


  changeTab = (index: number): void => {
    const path = PostTabsEnum[index];
    this.router.navigate([`../${path}`], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }

  /**
   * Remove "switch" after finish with all detail components
   */
  openOrigin(result) {
    switch (result.type) {
      case DataSourceType.FB_POST:
      case DataSourceType.OK_POST: {
        if (result.contentType === ContentTypeEnum.post) {
          return this.store$.dispatch(
            new PostActions.OpenOriginDetails({ result, route: this.route })
          );
        }
      }
    }
    return window.open(result.resourceLink, '_blank');
  }

}
