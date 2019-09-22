import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store , select } from '@ngrx/store';
import { Avatar } from '../models/avatar.model';
import { AvatarStoreState, AvatarStoreActions, AvatarStoreSelectors } from '../store';
import { Observable, combineLatest } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-avatar-details',
  templateUrl: './avatar-details.component.html',
  styleUrls: ['./avatar-details.component.scss']
})


export class AvatarDetailsComponent implements OnInit, OnDestroy {
  id: number;
  tabParam: string;
  avatarName = '';
  currentTabIndex = 0;
  isLoading$: Observable<boolean>;
  avatar: Avatar;

  tabs = [{
    index: 0,
    label: 'general',
    path: '../general'
  }, {
    index: 1,
    label: 'links',
    path: '../links'
  }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<AvatarStoreState.State>
  ) { }

  ngOnInit(): void {

    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams})
    );

    /**
     * Subscribe to the single observable, giving us both
     * routeParams containing both the query and route params
     */
    urlParams.subscribe(routeParams => {
      /**
       * Load avatar data from server by dispatching an action
       */
      if (this.id !== +routeParams.id) {
        this.id = +routeParams.id;
        this.store$.dispatch(
          new AvatarStoreActions.AvatarCrudActions.LoadDetailsRequest({ id: this.id })
        );
      }

      /**
       * Get tab name from url params and set it as active
       * Dispatch change tab action
       */
      if (this.tabParam !== routeParams.tab) {
        this.tabParam = routeParams.tab;
        this.store$.dispatch(
          new AvatarStoreActions.AvatarAdditionalActions.ChangeTab({ tabIndex: this.tabs.find((el) => {
              return el.label === this.tabParam;
            }).index })
        );
      }
    });

    this.isLoading$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getIsLoading
      )
    );

    /**
     * Get avatar details data
     */
    this.store$.pipe(
      delay(0),
      select(AvatarStoreSelectors.getSelected)
    ).subscribe(data => {
      this.avatar = data;
    });

    /**
     * Get avatar selected tab
     */
    this.store$.pipe(
      select(
        AvatarStoreSelectors.getCurrentTab
      )
    ).subscribe(data => this.currentTabIndex = data);
  }

  ngOnDestroy(): void {
    /**
     * Clear avatar data: connection, rules, details
     */
    // this.store$.dispatch(
    //   new AvatarStoreActions.AvatarAdditionalActions.ClearAvatarData()
    // );
  }

  edit(): void {
    this.router.navigate(['../../../edit', this.id], {relativeTo: this.route});
  }

  close(): void {
    this.router.navigate(['../../../list'], {relativeTo: this.route});
  }

  /**
   * Change tab parameter in url
   */
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.router.navigate([this.tabs[tabChangeEvent.index].path], { relativeTo: this.route });
  }
}
