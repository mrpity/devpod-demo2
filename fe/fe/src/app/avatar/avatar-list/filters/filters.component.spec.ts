/**
 * BEST TEST EXAMPLE https://github.com/tomastrajan/angular-ngrx-material-starter
 */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MockStore, TestingModule } from '@testing/utils';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AvatarStoreActions, AvatarStoreState } from '../../store';
import { RootStoreState } from '../../../store';
import { FiltersComponent } from './filters.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  OverlayRef
} from '@angular/cdk/overlay';
import { AvatarFiltersModel } from '@app/avatar/models/avatar.model';

// Mock filters data
const mockFilters = {
  createdAtFrom: new Date('2018-01-02'),
  createdAtTo: new Date('2018-02-02'),
  modifiedAtFrom: new Date('2018-03-02'),
  modifiedAtTo: new Date('2018-04-02')
};

// Mock Material Dialog
class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(mockFilters)
    };
  }
}

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: MockStore<RootStoreState.State>; // Use GLOBAL STORE for MockStore
  let dispatchSpy;
  let dialog: MatDialogMock;

  const getUIById = (id) => fixture.debugElement.query(By.css(`#${id}`));

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
          MatInputModule
        ],
        declarations: [
          FiltersComponent
        ],
        providers: [
          // When the component asks for the MatDialog service, we we’ll provide the MatDialogMock one.
          {
            provide: MatDialog, useClass: MatDialogMock
          }
        ],
        // Tells the compiler not to error on unknown elements and attributes
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
      store = TestBed.get(Store);
      fixture = TestBed.createComponent(FiltersComponent);
      component = fixture.componentInstance;
      dialog = TestBed.get(MatDialog);
    })
  );

  it('#should properly render modifiedAt filter', () => {
    component.listQueryFilter = {
      modifiedAtFrom: new Date('2018-01-11'),
      modifiedAtTo: new Date('2018-05-11')
    } as AvatarFiltersModel;
    fixture.detectChanges();
    expect(getUIById('s_modifiedAtFrom').nativeElement.textContent).toBe('11 Jan 2018');
    expect(getUIById('s_modifiedAtTo').nativeElement.textContent).toBe('11 May 2018');
  });

  it('#should properly render createdAt filter', () => {
    component.listQueryFilter = {
      createdAtFrom: new Date('2018-01-11'),
      createdAtTo: new Date('2018-05-11')
    } as AvatarFiltersModel;
    fixture.detectChanges();
    expect(getUIById('s_createdAtFrom').nativeElement.textContent).toBe('11 Jan 2018');
    expect(getUIById('s_createdAtTo').nativeElement.textContent).toBe('11 May 2018');
  });

  it('#should properly not render types filter', () => {
    component.listQueryFilter = {
      types: []
    } as AvatarFiltersModel;
    fixture.detectChanges();
    expect(getUIById('s_currentFilterdata_miner')).toBeFalsy();
    expect(getUIById('s_currentFilteractive')).toBeFalsy();
    expect(getUIById('s_currentFilterbaby')).toBeFalsy();
  });

  it('#should properly render types filter', () => {
    component.listQueryFilter = {
      types: ['BABY', 'ACTIVE', 'DATA_MINER']
    } as AvatarFiltersModel;
    fixture.detectChanges();
    expect(getUIById('s_currentFilterdata_miner')).toBeTruthy();
    expect(getUIById('s_currentFilteractive')).toBeTruthy();
    expect(getUIById('s_currentFilterbaby')).toBeTruthy();
  });

  it('#should properly reset all filters by press on reset button', () => {
    const resetBtn = getUIById('b_remove-all-filters');
    component.listQueryFilter = {
      types: ['BABY', 'ACTIVE', 'DATA_MINER'],
      modifiedAtFrom: new Date('2018-01-11'),
      modifiedAtTo: new Date('2018-05-11'),
      createdAtFrom: new Date('2018-01-11'),
      createdAtTo: new Date('2018-05-11')
    } as AvatarFiltersModel;
    fixture.detectChanges();
    expect(getUIById('s_currentFilterdata_miner')).toBeTruthy();
    expect(getUIById('s_currentFilteractive')).toBeTruthy();
    expect(getUIById('s_currentFilterbaby')).toBeTruthy();
    expect(getUIById('s_createdAtFrom')).toBeTruthy();
    expect(getUIById('s_createdAtTo')).toBeTruthy();
    expect(getUIById('s_modifiedAtFrom')).toBeTruthy();
    expect(getUIById('s_modifiedAtTo')).toBeTruthy();

    resetBtn.nativeElement.click();
    fixture.detectChanges();

    expect(getUIById('s_currentFilterdata_miner')).toBeFalsy();
    expect(getUIById('s_currentFilteractive')).toBeFalsy();
    expect(getUIById('s_currentFilterbaby')).toBeFalsy();
    expect(getUIById('s_createdAtFrom')).toBeFalsy();
    expect(getUIById('s_createdAtTo')).toBeFalsy();
    expect(getUIById('s_modifiedAtFrom')).toBeFalsy();
    expect(getUIById('s_modifiedAtTo')).toBeFalsy();
  });

  describe('#ngOnInit() >>', () => {
    it('should properly set filter from listQueryFilter input on init', () => {
      component.filter = {};
      component.listQueryFilter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      expect(component.filter).toEqual(component.listQueryFilter);
    });
  });

  describe('#ngOnChange() >>', () => {
    it('should properly set filter from listQueryFilter input on change filter', () => {
      component.filter = {};
      component.listQueryFilter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      } as AvatarFiltersModel;
      fixture.detectChanges();
      expect(component.filter).toEqual(component.listQueryFilter);

      const newListQueryFilter = {
        types: ['BABY', 'ACTIVE'],
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      };
      component.ngOnChanges({
        listQueryFilter: {
          currentValue: newListQueryFilter
        }
      });
      fixture.detectChanges();
      expect(component.filter).toEqual(newListQueryFilter);
    });
  });

  describe('#update list of avatars >>', () => {
    it('should call refreshList on applySearch', () => {
      component.listQueryFilter = {} as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');

      component.applySearch('test');

      expect(refreshListSpy).toHaveBeenCalled();
    });

    it('should call refreshList on clear search input', () => {
      component.listQueryFilter = {
        searchInName: 'test'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');
      const clearSearchBtn = getUIById('b_remove-search-string');

      clearSearchBtn.nativeElement.click();
      fixture.detectChanges();

      expect(refreshListSpy).toHaveBeenCalled();
    });

    it('should call refreshList after press on clear filters btn', () => {
      component.listQueryFilter = {
        searchInName: 'test'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');
      const clearFilters = getUIById('b_remove-all-filters');

      clearFilters.nativeElement.click();
      fixture.detectChanges();

      expect(refreshListSpy).toHaveBeenCalled();
    });

    it('should dispatch an action on refreshList', () => {
      component.listQueryFilter = {} as AvatarFiltersModel;
      fixture.detectChanges();
      const action = new AvatarStoreActions.AvatarListActions.ChangeFilter({ pageNumber: 0, filter: component.filter });
      dispatchSpy = spyOn(store, 'dispatch');
      component.refreshList();
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
  });

  describe('#remove single filter >>', () => {
    it('should remove types filter from filters and call refreshList', () => {
      component.listQueryFilter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');

      component.remove('types');

      component.filter = {
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      };

      expect(refreshListSpy).toHaveBeenCalled();
    });

    it('should remove modified filter from filters and call refreshList', () => {
      component.listQueryFilter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');

      component.remove('modified');

      component.filter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      };

      expect(refreshListSpy).toHaveBeenCalled();
    });

    it('should remove created filter from filters and call refreshList', () => {
      component.listQueryFilter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        createdAtFrom: new Date('2018-01-11'),
        createdAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      } as AvatarFiltersModel;
      fixture.detectChanges();

      const refreshListSpy = spyOn(component, 'refreshList');

      component.remove('created');

      component.filter = {
        types: ['BABY', 'ACTIVE', 'DATA_MINER'],
        modifiedAtFrom: new Date('2018-01-11'),
        modifiedAtTo: new Date('2018-05-11'),
        searchInName: 'aaaaaa'
      };

      expect(refreshListSpy).toHaveBeenCalled();
    });
  });

  describe('#modal dialog >>', () => {
    it('should call addFilters by press "Add" button', () => {
      const addFiltersSpy = spyOn(component, 'addFilters');
      component.listQueryFilter = {} as AvatarFiltersModel;
      fixture.detectChanges();
      const addButton = getUIById('b_add-filter');
      addButton.nativeElement.click();
      fixture.detectChanges();

      expect(addFiltersSpy).toHaveBeenCalled();
    });

    it('should call addMissingRangeDates after dialog window was closed', () => {
      spyOn(dialog, 'open').and.callThrough();
      spyOn(component, 'addMissingRangeDates');
      const addButton = getUIById('b_add-filter');
      addButton.nativeElement.click();
      expect(dialog.open).toHaveBeenCalled();
      expect(component.addMissingRangeDates).toHaveBeenCalled();
    });

    it('should open dialog window by press "Add" button and return properly filters after closing the modal window', () => {
      spyOn(dialog, 'open').and.callThrough();
      const addButton = getUIById('b_add-filter');
      addButton.nativeElement.click();
      expect(dialog.open).toHaveBeenCalled();
      expect(component.filter).toEqual({
        ...component.filter,
        ...mockFilters
      });
    });

    it('should return properly result after use addMissingRangeDates', () => {
      let res = component.addMissingRangeDates({
        createdAtFrom: new Date('2018-01-02'),
        modifiedAtFrom: new Date('2018-03-02'),
      });
      expect(res).toEqual({
        createdAtFrom: new Date('2018-01-02'),
        modifiedAtFrom: new Date('2018-03-02'),
        createdAtTo: res.createdAtTo,
        modifiedAtTo: res.modifiedAtTo
      });

      res = component.addMissingRangeDates({
        createdAtTo: new Date('2018-01-02'),
        modifiedAtTo: new Date('2018-03-02'),
      });
      expect(res).toEqual({
        createdAtTo: new Date('2018-01-02'),
        modifiedAtTo: new Date('2018-03-02'),
        createdAtFrom: new Date('2018-01-01'),
        modifiedAtFrom: new Date('2018-01-01')
      });
    });
  });

});
