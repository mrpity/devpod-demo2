import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { select, Store } from '@ngrx/store';
import { DataSourceStoreSelectors, DataSourceStoreState, DataSourceStoreActions } from '@app/data-source/store';
import {DataSourceLogOutput} from '@app/data-source/models/data-source-crud.model';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.215, 0.61, 0.355, 1)')),
    ]),
  ],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  dataSourceId: number;
  data: any;
  failedGateway = false;
  isLoadingResults = false;
  statisticStream: DataSourceLogOutput[];

  private _unsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<DataSourceStoreState.State>,
    public helpers: HelpersService
  ) {
  }

  ngOnInit() {
    this.isLoadingResults = true;

    this.dataSourceId = this.route.snapshot.parent.params.id;
    if (!this.dataSourceId || isNaN(this.dataSourceId)) {
      this.navigateToList();
      return;
    }

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getSelectedStatistics),
      filter(Boolean)
    ).subscribe((data) => {
        this.data = { ...data };
        this.statisticStream = this.data.sessions;
        this.isLoadingResults = false;
    });

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getFailedGateway)
    ).subscribe((data) => {
      this.failedGateway = data;
      if (data) {
        this.isLoadingResults = false;
      }
    });

    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceDetailsActions.LoadStatisticsRequest(this.dataSourceId)
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private navigateToList() {
    this.router.navigate(['app/data-source/list']);
  }
}
