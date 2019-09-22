import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Store, select } from '@ngrx/store';
import { UserListQueryModel, User } from '../models/user.model';
import {
  UserStoreState,
  UserStoreActions,
  UserStoreSelectors
} from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  /**
   * Observables
   * - Getting ASYNC data from Store
   */
  userList$: Observable<User[]> = this.store$.pipe(
    select(
      UserStoreSelectors.getCurrentUsers
    )
  );
  userListLength$: Observable<number> = this.store$.pipe(
    select(
      UserStoreSelectors.getTotalUsersCount
    )
  );
  isLoading$: Observable<boolean> = this.store$.pipe(
    select(
      UserStoreSelectors.getIsLoading
    )
  );
  listQuery$: Observable<UserListQueryModel> = this.store$.pipe(
    select(
      UserStoreSelectors.getListQuery
    )
  );
  error$: Observable<any>;

  /**
   * Class static variables
   * - SYNC data from Store
   * - some other variables
   */
  listQuery: UserListQueryModel;
  displayedColumns = ['id', 'fullName', 'email', 'role', 'createdAt', 'modifiedAt'];

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   * @param router
   * @param _route
   * @param store$ - ngrx Store with current UserStore RequestsState
   */
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private store$: Store<UserStoreState.State>
  ) { }

  ngOnInit() {

    /**
     * Get SYNC data from Store through selectors
     */
    this.listQuery$.subscribe(data => this.listQuery = data);

    /**
     * Load data from server by dispatching an action
     */
    this.store$.dispatch(
      new UserStoreActions.UserListActions.FetchDataByDefault()
    );
  }

  /**
   * Clear list query params on destroy component
   */
  ngOnDestroy() {
    this.store$.dispatch(
      new UserStoreActions.UserListActions.ClearListQuery()
    );
  }

  /**
   * Handle pagination change
   * @param ev - event param with pagination data
   */
  paginationChange(ev: any) {
    this.store$.dispatch(
      new UserStoreActions.UserListActions.ChangePagination({
        pageNumber: ev.pageIndex,
        pageSize: ev.pageSize
      })
    );
  }

  /**
   * Opens create route
   */
  openCreateUser() {
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
      new UserStoreActions.UserListActions.ChangeSorting({ sortBy })
    );
  }
}
