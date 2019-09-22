import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil, map } from 'rxjs/operators';
import { AutomationRuleOnce, AutomationRuleDaily } from '@app/data-source/models/automation-rule.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { ClipboardService } from 'ngx-clipboard';
import { DataSourceStoreActions, DataSourceStoreState, DataSourceStoreSelectors } from '@app/data-source/store';
import { Store, select } from '@ngrx/store';
import { DataSourceType } from '@app/data-source/data-source.enums';
import { CrawlingTypesService } from '@app/data-source/services/crawling-types.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  dataSourceId: number;
  data: any;
  failedGateway = false;
  isLoadingResults = false;
  isStateChanging = false;
  automationRulesStream = new BehaviorSubject<(AutomationRuleDaily | AutomationRuleOnce)[]>([]);

  private _unsubscribe$ = new Subject();
  private _stateToggleStream = new Subject();

  constructor(
    private _clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<DataSourceStoreState.State>,
    public helpers: HelpersService,
    public crawling: CrawlingTypesService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;

    this.dataSourceId = this.route.snapshot.parent.params.id;
    if (!this.dataSourceId || isNaN(this.dataSourceId)) {
      this.navigateToList();
      return;
    }

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(DataSourceStoreSelectors.getSelectedGeneralInfo)
    ).subscribe((data) => {
      if (data) {
        this.data = { ...data };
        this.automationRulesStream = this.data.automationRules;
        this.isLoadingResults = false;
      }
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
      new DataSourceStoreActions.DataSourceDetailsActions.LoadDataSourceAndProxiesRequest(this.dataSourceId)
    );

    this._stateToggleStream.pipe(
      takeUntil(this._unsubscribe$),
      map((newState: boolean) => { this.isStateChanging = true; return newState; }),
      debounceTime(300),
      map((newState: boolean) => newState)
    ).subscribe((newState: boolean) => {
      this.isStateChanging = false;
      this.store$.dispatch(
        new DataSourceStoreActions.DataSourceCrudActions.ChangeStateRequest({ enabled: newState, id: this.data.id })
      );
    });
  }

  get webGeneral() {
    return this.data.type === DataSourceType.WEB_GENERAL;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  toggleAutomationRulesState(enabled) {
    this._stateToggleStream.next(enabled);
  }

  private navigateToList() {
    this.router.navigate(['app/data-source/list']);
  }
}
