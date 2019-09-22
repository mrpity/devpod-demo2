import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsTabsEnum } from '@app/data-source/models/data-source-crud.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { DataSourceStoreState, DataSourceStoreActions } from '@app/data-source/store';

@Component({
  selector: 'app-data-source-details',
  templateUrl: './data-source-details.component.html',
  styleUrls: ['./data-source-details.component.scss']
})
export class DataSourceDetailsComponent implements OnInit, OnDestroy {
  dataSourceId: string;
  currentTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject,
    private store$: Store<DataSourceStoreState.State>
  ) { }

  ngOnInit() {
    this.dataSourceId = this.route.snapshot.params.id;
    this.mapUrlToTab();
  }

  gotoEdit() {
    this.router.navigate(['../../edit', this.dataSourceId], { relativeTo: this.route });
  }

  navigateToList() {
    this.store$.dispatch(new DataSourceStoreActions.DataSourceDetailsActions.ClearSelectedDataSource());
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }

  getTitle(id) {
    return id.toString().padStart(6, '0');
  }

  private mapUrlToTab() {
    const routeConfig = this.route.snapshot.firstChild.routeConfig.path;
    this.currentTabIndex = DetailsTabsEnum[routeConfig];
  }

  changeTab = (index: number): void => {
    this.currentTabIndex = index;
    const path = DetailsTabsEnum[index];
    this.store$.dispatch(new DataSourceStoreActions.DataSourceDetailsActions.ChangeTab(index));
    this.router.navigate([`./${path}`], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }

  get tab() {
    return DetailsTabsEnum;
  }

  ngOnDestroy() {
    this.store$.dispatch(new DataSourceStoreActions.DataSourceDetailsActions.ClearSelectedDataSource());
  }
}
