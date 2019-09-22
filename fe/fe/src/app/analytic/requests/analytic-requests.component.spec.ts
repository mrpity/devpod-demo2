import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticRequestsComponent } from './analytic-requests.component';

describe('RequestsComponent', () => {
  let component: AnalyticRequestsComponent;
  let fixture: ComponentFixture<AnalyticRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
