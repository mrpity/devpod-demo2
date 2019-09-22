import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as RootActions from '@app/store/actions';
import { getRouterParams } from '@app/store/app.selectors';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostDetailsParams, ProfileTabsEnum } from '@app/search/models/post.model';
import { ProfileSelectors, ResultsSelectors } from '@app/search/store/selectors';
import { SearchState } from '@app/search/store/reducers';
import { ResultsActions } from '@app/search/store/actions';
import { ProfileOutput } from '@app/search/models/profile.model';
import { TranslateService } from '@ngx-translate/core';

_('navigation.details');
_('navigation.index.posts');
_('search.results.titles.FB_PROFILE');
_('search.results.titles.OK_PROFILE');

@Component({
  selector: 'app-result-profile',
  templateUrl: './result-profile.component.html',
  styleUrls: ['./result-profile.component.scss']
})
export class ResultProfileComponent implements OnInit {

  routerParams$: Observable<Params> = this.store$.pipe(
    select(getRouterParams)
  );

  resultDetails$: Observable<ProfileOutput> = this.store$.pipe(
    select(
      ProfileSelectors.getResultDetails
    ),
    filter(profile => !!profile)
  );

  selectedId$: Observable<string> = this.store$.pipe(
    select(
      ProfileSelectors.getSelectedId
    )
  );

  selectedResultId$: Observable<string> = this.store$.pipe(
    select(
      ResultsSelectors.getSelectedResultId
    ),
    filter(string => !!string)
  );

  selectedResultId: string;
  currentTabIndex = 0;
  query: string;
  selectedId: string;
  resultDetailsData: ProfileOutput;
  routerParams: Params | PostDetailsParams;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<SearchState>,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.routerParams$.pipe(
      filter(params => params && params.tabs)
    ).subscribe(params => {
      this.routerParams = params;
      const tabs: string = this.routerParams.tabs;
      this.currentTabIndex = ProfileTabsEnum[tabs];
    });

    this.resultDetails$.subscribe(result => this.resultDetailsData = result);

    this.selectedResultId$.subscribe(data => this.selectedResultId = data);

    this.selectedId$.subscribe(data => this.selectedId = data);
  }

  closeDetails() {
    this.selectedResultId !== this.selectedId
      ? this.store$.dispatch(new RootActions.RouterActions.RouterBack())
      : this.store$.dispatch(new ResultsActions.CloseDetails({ id: this.selectedId, route: this.route }));
  }

  changeTab = (index: number): void => {
    const path = ProfileTabsEnum[index];
    this.router.navigate([`../${path}`], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }

  get title(): string {
    if (this.resultDetailsData) {
      const _title = this.resultDetailsData;
      const _type = `search.results.titles.${_title.type}`;
      return `${this.translate.instant(_type)}: ${_title.firstName} ${_title.lastName}`;
    }
  }
}


