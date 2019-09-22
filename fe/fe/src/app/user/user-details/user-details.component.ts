import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors, UserStoreState } from '../store';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: number;
  data: User;
  failedGateway = false;

  private _unsubscribe$ = new Subject();

  selectedDetails$: Observable<User> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getOneUser)
  );

  isLoading$: Observable<boolean> = this.store$.pipe(
    takeUntil(this._unsubscribe$),
    select(UserStoreSelectors.getIsLoading)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<UserStoreState.State>,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    if (!this.userId || isNaN(this.userId)) {
      this.navigateToList();
      return;
    }

    this.selectedDetails$.subscribe((data) => {
      if (data) {
        this.data = { ...data };
      }
    });

    this.store$.dispatch(
      new UserStoreActions.UserCrudActions.LoadDetailsRequest({ id: this.userId })
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  gotoEdit() {
    this.router.navigate(['../../edit', this.userId], { relativeTo: this.route });
  }

  navigateToList() {
    this.router.navigate(['app/user/list']);
  }

  getTitle(id) {
    return id.toString().padStart(3, '0');
  }
}
