import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticResultsComponent } from './analytic-results.component';

describe('ResultsComponent', () => {
  let component: AnalyticResultsComponent;
  let fixture: ComponentFixture<AnalyticResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
