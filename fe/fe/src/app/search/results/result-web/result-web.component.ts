import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getRouterParams } from '@app/store/app.selectors';
import { SearchState } from '@app/search/store/reducers';
import { filter } from 'rxjs/operators';
import { PostDetailsParams, WebPageTabsEnum } from '@app/search/models/post.model';
import { ResultsSelectors, WebPageSelectors } from '@app/search/store/selectors';
import { WebPageOutput } from '@app/search/models/webpage.model';
import * as RootActions from '@app/store/actions';
import { ResultsActions } from '@app/search/store/actions';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('navigation.details');
_('navigation.index.webpage');
_('search.results.titles.WEB_GENERAL');

@Component({
  selector: 'app-result-web',
  templateUrl: './result-web.component.html',
  styleUrls: ['./result-web.component.scss']
})
export class ResultWebComponent implements OnInit {


  routerParams$: Observable<Params> = this.store$.pipe(
    select(getRouterParams)
  );

  resultDetails$: Observable<WebPageOutput> = this.store$.pipe(
    select(
      WebPageSelectors.getResultDetails
    ),
    filter(page => !!page)
  );

  selectedId$: Observable<string> = this.store$.pipe(
    select(
      WebPageSelectors.getSelectedId
    )
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
      this.currentTabIndex = WebPageTabsEnum[tabs];
    });

    this.selectedResultId$.subscribe(data => this.selectedResultId = data);

    this.selectedId$.subscribe(data => this.selectedId = data);
  }

  closeDetails() {
    this.selectedResultId !== this.selectedId
      ? this.store$.dispatch(new RootActions.RouterActions.RouterBack())
      : this.store$.dispatch(new ResultsActions.CloseDetails({ id: this.selectedId, route: this.route }));
  }

  changeTab = (index: number): void => {
    const path = WebPageTabsEnum[index];
    this.router.navigate([`../${path}`], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }

}
