import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, TestingModule } from '@testing/utils';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvatarEditComponent } from './avatar-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootStoreState } from '../../store';
import { AvatarStoreActions, AvatarStoreState } from '../store';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ProxyStoreState } from '@app/proxy/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@app/shared/utils';

xdescribe('AvatarCreateComponent', () => {
  let component: AvatarEditComponent;
  let fixture: ComponentFixture<AvatarEditComponent>;
  let store: MockStore<RootStoreState.State>; // Use GLOBAL STORE for MockStore
  let dispatchSpy;

  const getUIById = (id) => fixture.debugElement.query(By.css(`#${id}`));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatNativeDateModule,
        MatDialogModule,
        MatRadioModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AvatarEditComponent
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      avatar: AvatarStoreState.initialState,
      proxy: {} as ProxyStoreState.State,
      router: {} as RouterReducerState<RouterStateUrl>
    });
    fixture = TestBed.createComponent(AvatarEditComponent);
    component = fixture.componentInstance;
  });

  it('#should create current component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('#should properly react on create avatar', () => {
    fixture.detectChanges();
    const avatar = {
      firstName: 'Имя',
      lastName: 'Фамилия',
      type: 'BABY',
      professionalSkills: 'bla bla bla'
    };
    fixture.detectChanges();
    const action = new AvatarStoreActions.AvatarCrudActions.UpdateRequest(avatar);
    dispatchSpy = spyOn(store, 'dispatch');
    component.update(avatar);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('#should properly react on create avatar fail and handle errors from formData', () => {
    fixture.detectChanges();
    const formData = {
      controls: {
        someField: {
          errors: ['required']
        }
      }
    };
    fixture.detectChanges();
    const action = new AvatarStoreActions.AvatarCrudActions.FormInvalid(formData);
    dispatchSpy = spyOn(store, 'dispatch');
    component.updateFailed(formData);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#should cancel avatar edit by press "Cancel" button', () => {
    const cancelAvatarCreate = spyOn(component, 'cancelAvatarEdit');
    fixture.detectChanges();

    const cancelBtn = getUIById('b_cancelCreateAvatar');
    cancelBtn.nativeElement.click();
    fixture.detectChanges();

    expect(cancelAvatarCreate).toHaveBeenCalled();
  });

  describe('#ngOnInit() >>', () => {
    it('should return properly values on init', () => {
      const isCreateDisabled = true;

      spyOn(store, 'pipe').and.returnValue(hot('-a', { a: isCreateDisabled }));
      fixture.detectChanges();

      const expected = cold('-a', { a: isCreateDisabled });
      expect(component.isCreateDisabled$).toBeObservable(expected);
    });
  });
});
