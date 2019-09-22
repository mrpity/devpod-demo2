import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store, select } from '@ngrx/store';
import { Avatar, AvatarListQueryModel } from '../models/avatar.model';
import {
  AvatarStoreState,
  AvatarStoreActions,
  AvatarStoreSelectors
} from '../store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AvatarConnectionStatus } from '../avatar.enums';

@Component({
  selector: 'app-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.scss']
})
export class AvatarListComponent implements OnInit, OnDestroy {

  /**
   * Observables
   * - Getting ASYNC data from Store
   */
  avatarList$: Observable<Avatar[]>;
  avatarListLength$: Observable<number>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  /**
   * Class static variables
   * - SYNC data from Store
   * - some other variables
   */
  listQuery: AvatarListQueryModel;
  displayedColumns = ['id', 'type', 'name', 'linkedSN', 'createdAt', 'modifiedAt'];

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   * @param router
   * @param _route
   * @param paginatorService
   * @param translate
   * @param store$ - ngrx Store with current AvatarStore RequestsState
   */
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private paginatorService: MatPaginatorIntl,
    private translate: TranslateService,
    private store$: Store<AvatarStoreState.State>
  ) { }

  ngOnInit() {
    /**
     * Get ASYNC data from Store through selectors
     */
    this.avatarList$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getAvatars
      )
    );
    this.avatarListLength$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getAvatarsTotal
      )
    );
    this.isLoading$ = this.store$.pipe(
      select(
        AvatarStoreSelectors.getIsLoading
      )
    );

    /**
     * Get SYNC data from Store through selectors
     */
    this.store$.pipe(
      select(
        AvatarStoreSelectors.getListQuery
      )
    ).subscribe(data => this.listQuery = data);

    /**
     * Load data from server by dispatching an action
     */
    this.store$.dispatch(
      new AvatarStoreActions.AvatarListActions.FetchDataByDefault()
    );
  }

  /**
   * Clear list query params on destroy component
   */
  ngOnDestroy() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarListActions.ClearListQuery()
    );
  }

  /**
   * Handle pagination change
   * @param ev - event param with pagination data
   */
  paginationChange(ev: any) {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarListActions.ChangePagination({
        pageNumber: ev.pageIndex,
        pageSize: ev.pageSize
      })
    );
  }

  /**
   * Opens create route
   */
  openCreateAvatar() {
    this.router.navigate(['../create'], { relativeTo: this._route });
  }

  /**
   * Sort data in list
   * @param name - name of table column for sorting
   */
  sortData(name: string) {
    const sortBy = {
      ...this.listQuery.sortBy
    };

    if (sortBy.field === name) {
      sortBy.asc = !sortBy.asc;
    } else {
      sortBy.field = name;
      sortBy.asc = true;
    }

    this.store$.dispatch(
      new AvatarStoreActions.AvatarListActions.ChangeSorting({ sortBy })
    );
  }
}
