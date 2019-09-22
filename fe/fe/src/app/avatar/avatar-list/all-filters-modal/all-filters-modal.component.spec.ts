/**
 * BEST TEST EXAMPLE https://github.com/tomastrajan/angular-ngrx-material-starter
 */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/utils';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelpersService } from '@app/shared/services/helpers.service';

import { AllFiltersModalComponent } from './all-filters-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OverlayRef
} from '@angular/cdk/overlay';

const data = {
  lala: 'lalala',
  type: 'all',
  filter: {
    types: ['BABY', 'ACTIVE'],
    createdAtFrom: new Date('2018-02-01'),
    createdAtTo: new Date('2018-03-01'),
    modifiedAtFrom: new Date('2018-04-01'),
    modifiedAtTo: new Date('2018-05-01'),
  }
};

describe('AllFiltersModalComponent', () => {
  let component: AllFiltersModalComponent;
  let fixture: ComponentFixture<AllFiltersModalComponent>;
  let dialogRef: MatDialogRef<AllFiltersModalComponent>;
  let helpersService: HelpersService;
  let formBuilder: FormBuilder;

  const getUIById = (id) => fixture.debugElement.query(By.css(`#${id}`));

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TestingModule,
          MatButtonModule,
          MatCheckboxModule,
          MatDatepickerModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          MatNativeDateModule
        ],
        declarations: [
          AllFiltersModalComponent
        ],
        providers: [
          FormBuilder,
          {
            provide: MatDialogRef,
            useValue: {
              close: (filters) => filters,
              disableClose: false
            }
          },
          { provide: MAT_DIALOG_DATA, useValue: data },
          {
            provide: HelpersService,
            useValue: {
              removeEmptyKeys: (res) => res
            }
          },
        ],
        // Tells the compiler not to error on unknown elements and attributes
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(AllFiltersModalComponent);
      component = fixture.componentInstance;
      dialogRef = TestBed.get(MatDialogRef);
      helpersService = TestBed.get(HelpersService);
      formBuilder = TestBed.get(FormBuilder);
    })
  );

  it('#should properly get data from parent component', () => {
    expect(component.data).toEqual(data);
  });

  describe('#ngOnInit() >>', () => {
    it('should properly set filter from data.filter', () => {
      expect(component.filter).toBeFalsy();
      fixture.detectChanges();
      expect(component.filter).toEqual(data.filter);
    });

    it('should properly set each of types.isChecked by filter data', () => {
      expect(component.types[0].isChecked).toBe(false);
      expect(component.types[1].isChecked).toBe(false);
      expect(component.types[2].isChecked).toBe(false);
      fixture.detectChanges();
      expect(component.types[0].isChecked).toBe(true);
      expect(component.types[1].isChecked).toBe(true);
      expect(component.types[2].isChecked).toBe(false);
    });

    it('should properly set filtersForm by filter data', () => {
      expect(component.filtersForm).toBeFalsy();
      fixture.detectChanges();
      expect(component.filtersForm.get('createdAtFrom').value).toEqual(data.filter.createdAtFrom);
      expect(component.filtersForm.get('createdAtTo').value).toEqual(data.filter.createdAtTo);
      expect(component.filtersForm.get('modifiedAtFrom').value).toEqual(data.filter.modifiedAtFrom);
      expect(component.filtersForm.get('modifiedAtTo').value).toEqual(data.filter.modifiedAtTo);
    });
  });

  describe('#apply filters and close modal dialog window >>', () => {
    it('should call apply method by press on apply btn', () => {
      spyOn(component, 'apply');
      const applyBtn = getUIById('popup-apply-btn');
      applyBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.apply).toHaveBeenCalled();
    });

    it('should close dialog window by press on apply btn', () => {
      spyOn(helpersService, 'removeEmptyKeys').and.returnValue({
        createdAtFrom: new Date('2018-09-01'),
        createdAtTo: new Date('2018-10-01')
      });
      component.data.type = 'all';
      component.filtersForm = {} as FormGroup;
      component.types = [{
        name: 'avatar.baby',
        value: 'BABY',
        isChecked: false
      }, {
        name: 'avatar.active',
        value: 'ACTIVE',
        isChecked: false
      }, {
        name: 'avatar.data_miner',
        value: 'DATA_MINER',
        isChecked: true
      }];
      spyOn(dialogRef, 'close');
      const applyBtn = getUIById('popup-apply-btn');
      applyBtn.nativeElement.click();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledWith({
        types: ['DATA_MINER'],
        createdAtFrom: new Date('2018-09-01'),
        createdAtTo: new Date('2018-10-01')
      });
    });

    it('should close dialog window only with selected types', () => {
      component.data.type = 'types';
      component.types = [{
        name: 'avatar.baby',
        value: 'BABY',
        isChecked: false
      }, {
        name: 'avatar.active',
        value: 'ACTIVE',
        isChecked: true
      }, {
        name: 'avatar.data_miner',
        value: 'DATA_MINER',
        isChecked: true
      }];
      spyOn(dialogRef, 'close');
      const applyBtn = getUIById('popup-apply-btn');
      applyBtn.nativeElement.click();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledWith({
        types: ['ACTIVE', 'DATA_MINER']
      });
    });

    it('should close dialog window only with selected created dates', () => {
      component.data.type = 'created';
      component.filtersForm = {
        value: {
          createdAtFrom: new Date('2018-09-01'),
          createdAtTo: new Date('2018-10-01')
        }
      } as FormGroup;
      spyOn(dialogRef, 'close');
      const applyBtn = getUIById('popup-apply-btn');
      applyBtn.nativeElement.click();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledWith({
        createdAtFrom: new Date('2018-09-01'),
        createdAtTo: new Date('2018-10-01')
      });
    });

    it('should close dialog window only with selected modified dates', () => {
      component.data.type = 'modified';
      component.filtersForm = {
        value: {
          modifiedAtFrom: new Date('2018-09-01'),
          modifiedAtTo: new Date('2018-10-01')
        }
      } as FormGroup;
      spyOn(dialogRef, 'close');
      const applyBtn = getUIById('popup-apply-btn');
      applyBtn.nativeElement.click();
      fixture.detectChanges();
      expect(dialogRef.close).toHaveBeenCalledWith({
        modifiedAtFrom: new Date('2018-09-01'),
        modifiedAtTo: new Date('2018-10-01')
      });
    });
  });

  it('#should close dialog window by press on close btn', () => {
    spyOn(dialogRef, 'close');
    const closeBtn = getUIById('b_closeFilterPopup');
    closeBtn.nativeElement.click();
    fixture.detectChanges();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

});
