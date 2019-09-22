import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSummaryTableComponent } from './export-summary-table.component';

xdescribe('ExportSummaryTableComponent', () => {
  let component: ExportSummaryTableComponent;
  let fixture: ComponentFixture<ExportSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
