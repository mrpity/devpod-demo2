import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticFiltersComponent } from './analytic-filters.component';

xdescribe('FiltersComponent', () => {
  let component: AnalyticFiltersComponent;
  let fixture: ComponentFixture<AnalyticFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
