/**
 * BEST TEST EXAMPLE https://github.com/tomastrajan/angular-ngrx-material-starter
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, TestingModule } from '@testing/utils';
import { By } from '@angular/platform-browser';

import { AvatarStoreActions, AvatarStoreState } from '../store';
import { RootStoreState } from '../../store';
import { AvatarListComponent } from './avatar-list.component';
// import { FiltersComponent } from './filters/filters.component';
// import { AllFiltersModalComponent } from './all-filters-modal/all-filters-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@app/shared/shared.module';
import { ProxyStoreState } from '@app/proxy/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@app/shared/utils';

describe('AvatarListComponent', () => {
  let component: AvatarListComponent;
  let fixture: ComponentFixture<AvatarListComponent>;
  let store: MockStore<RootStoreState.State>; // Use GLOBAL STORE for MockStore
  let dispatchSpy;

  const getListOnUI = () => fixture.debugElement.queryAll(By.css('table tr.row'));

  // const getBigInput = () =>
  //   fixture.debugElement.query(By.css('anms-big-input'));

  // const getBigInputValue = () =>
  //   getBigInput().query(By.css('input')).nativeElement.value;

  // const getTodosFilter = () =>
  //   fixture.debugElement.query(By.css('.todos-filter'));

  // const getTodosFilterOptions = () =>
  //   fixture.debugElement.queryAll(
  //     By.css('.todos-filter-menu-overlay .mat-menu-item')
  //   );

  // const deleteDoneTodosBtn = () =>
  //   fixture.debugElement.query(
  //     By.css('anms-big-input-action[fontIcon="fa-trash"] > button')
  //   );

  // const addTodoBtn = () =>
  //   fixture.debugElement.query(
  //     By.css('anms-big-input-action[fontIcon="fa-plus"] > button')
  //   );

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TestingModule,
          MatButtonModule,
          MatCheckboxModule,
          MatChipsModule,
          MatDatepickerModule,
          MatDialogModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatPaginatorModule,
          MatTableModule,
          MatProgressSpinnerModule,
          SharedModule
        ],
        declarations: [
          AvatarListComponent
        ],
        // Tells the compiler not to error on unknown elements and attributes
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      avatar: AvatarStoreState.initialState,
      proxy: {} as ProxyStoreState.State,
      router: {} as RouterReducerState<RouterStateUrl>
    });
    fixture = TestBed.createComponent(AvatarListComponent);
    component = fixture.componentInstance;
  });

  it('#should be created with 0 avatars by default', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getListOnUI().length).toBe(0);
  });

  describe('#ngOnInit() >>', () => {
    const mockAvatarState: AvatarStoreState.State = {
      ...AvatarStoreState.initialState,
      listQuery: {
        filter: {
          types: ['ACTIVE'],
          createdAtTo: new Date()
        },
        pageNumber: 2,
        pageSize: 20,
        sortBy: {
          field: 'name',
          asc: false
        }
      },
      avatarsTotal: 1,
      avatars: [{
        id: 2,
        createdAt: new Date(),
        name: 'string2',
        modifiedAt: new Date(),
        profilePicBase64: 'string',
        type: 'string',
        connections: {}
      }],
      isLoading: false,
      selected: null
    };

    it('should dispatch action FetchDataByDefault', () => {
      const action = new AvatarStoreActions.AvatarListActions.FetchDataByDefault();
      dispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('should select avatars from store', () => {
      const avatars = [
        {
          id: 1,
          createdAt: new Date(),
          name: 'string1',
          modifiedAt: new Date(),
          profilePicBase64: 'string',
          type: 'string'
        },
        {
          id: 2,
          createdAt: new Date(),
          name: 'string2',
          modifiedAt: new Date(),
          profilePicBase64: 'string',
          type: 'string'
        },
      ];

      spyOn(store, 'pipe').and.returnValue(hot('-a', { a: avatars }));
      fixture.detectChanges();

      const expected = cold('-a', { a: avatars });
      expect(component.avatarList$).toBeObservable(expected);
    });

    it('should select total avatars count from store', () => {
      const length = 4;
      spyOn(store, 'pipe').and.returnValue(hot('-a', { a: length }));

      fixture.detectChanges();

      const expected = cold('-a', { a: length });
      expect(component.avatarListLength$).toBeObservable(expected);
    });

    it('should select isLoading flag from store', () => {
      const isLoading = true;
      spyOn(store, 'pipe').and.returnValue(hot('-a', { a: isLoading }));

      fixture.detectChanges();

      const expected = cold('-a', { a: isLoading });
      expect(component.isLoading$).toBeObservable(expected);
    });

    it('should select initial listQuery data from store and set properly params for pagination and filters', () => {
      store.setState({
        avatar: mockAvatarState,
        proxy: {} as ProxyStoreState.State,
        router: {} as RouterReducerState<RouterStateUrl>
      });

      fixture.detectChanges();

      expect(component.listQuery).toBe(mockAvatarState.listQuery);
      const pagination = fixture.debugElement.query(By.css('mat-paginator'));
      expect(+pagination.attributes['ng-reflect-page-size']).toBe(mockAvatarState.listQuery.pageSize);
      expect(+pagination.attributes['ng-reflect-page-index']).toBe(mockAvatarState.listQuery.pageNumber);
      expect(+pagination.attributes['ng-reflect-length']).toBe(mockAvatarState.avatarsTotal);
      expect(pagination.attributes['ng-reflect-page-size-options']).toBe([20, 40, 60, 80, 100].join(','));
    });
  });

  it('#should call ChangePagination action on pagination change', () => {
    store.setState({
      avatar: AvatarStoreState.initialState,
      proxy: {} as ProxyStoreState.State,
      router: {} as RouterReducerState<RouterStateUrl>
    });
    const pagi = {
      pageIndex: 1,
      pageSize: 40
    };
    const action = new AvatarStoreActions.AvatarListActions.ChangePagination({
      pageNumber: pagi.pageIndex,
      pageSize: pagi.pageSize
    });
    dispatchSpy = spyOn(store, 'dispatch');
    component.paginationChange(pagi);

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  // it('should filter and show "DONE" todos', () => {
  //   store.setState(
  //     createState({
  //       items: [
  //         { id: '1', name: 'test 1', done: true },
  //         { id: '2', name: 'test 2', done: false }
  //       ],
  //       filter: 'DONE'
  //     })
  //   );

  //   fixture.detectChanges();
  //   expect(getTodos().length).toBe(1);
  //   expect(getTodos()[0].nativeElement.textContent.trim()).toBe('test 1');
  // });

  // it('should dispatch remove "DONE" todos action', () => {
  //   store.setState(
  //     createState({
  //       items: [
  //         { id: '1', name: 'test 1', done: true },
  //         { id: '2', name: 'test 2', done: false }
  //       ],
  //       filter: 'DONE'
  //     })
  //   );

  //   fixture.detectChanges();
  //   dispatchSpy = spyOn(store, 'dispatch');
  //   deleteDoneTodosBtn().triggerEventHandler('click', {});

  //   fixture.detectChanges();
  //   expect(dispatchSpy).toHaveBeenCalledTimes(1);
  //   expect(dispatchSpy).toHaveBeenCalledWith(new ActionTodosRemoveDone());
  // });

  // it('should dispatch add todo action', () => {
  //   dispatchSpy = spyOn(store, 'dispatch');
  //   component.newTodo = 'test';
  //   addTodoBtn().triggerEventHandler('click', {});

  //   fixture.detectChanges();
  //   expect(component.newTodo).toBe('');
  //   expect(dispatchSpy).toHaveBeenCalledTimes(1);
  //   expect(dispatchSpy.calls.mostRecent().args[0].payload.name).toBe('test');
  // });

  // it('should dispatch filter todo action', () => {
  //   dispatchSpy = spyOn(store, 'dispatch');
  //   getTodosFilter().triggerEventHandler('click', {});
  //   getTodosFilterOptions()[2].triggerEventHandler('click', {});

  //   expect(dispatchSpy).toHaveBeenCalledTimes(1);
  //   expect(dispatchSpy).toHaveBeenCalledWith(
  //     new ActionTodosFilter({ filter: 'ACTIVE' })
  //   );
  // });

  // it('should dispatch toggle todo action', () => {
  //   store.setState(
  //     createState({
  //       items: [{ id: '1', name: 'test 1', done: true }],
  //       filter: 'ALL'
  //     })
  //   );

  //   fixture.detectChanges();
  //   dispatchSpy = spyOn(store, 'dispatch');
  //   getTodos()[0]
  //     .query(By.css('.todo-label'))
  //     .triggerEventHandler('click', {});

  //   fixture.detectChanges();
  //   expect(dispatchSpy).toHaveBeenCalledTimes(1);
  //   expect(dispatchSpy).toHaveBeenCalledWith(
  //     new ActionTodosToggle({ id: '1' })
  //   );
  // });

  // it('should disable remove done todos button if no todo is done', () => {
  //   store.setState(
  //     createState({
  //       items: [{ id: '1', name: 'test 1', done: true }],
  //       filter: 'ALL'
  //     })
  //   );

  //   fixture.detectChanges();
  //   expect(deleteDoneTodosBtn().nativeElement.disabled).toBeFalsy();

  //   component.todos.items[0].done = false;

  //   fixture.detectChanges();
  //   expect(deleteDoneTodosBtn().nativeElement.disabled).toBeTruthy();
  // });

  // it('should disable add new todo button if input length is less than 4', () => {
  //   component.newTodo = 'test';

  //   fixture.detectChanges();
  //   expect(addTodoBtn().nativeElement.disabled).toBeFalsy();

  //   component.newTodo = 'tes';

  //   fixture.detectChanges();
  //   expect(addTodoBtn().nativeElement.disabled).toBeTruthy();
  // });

  // it('should clear new todo input value on ESC key press', () => {
  //   component.newTodo = 'tes';
  //   getBigInput().triggerEventHandler('keyup.escape', {});

  //   fixture.detectChanges();
  //   expect(getBigInputValue()).toBe('');
  // });
});
