import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportListRowComponent } from './export-list-row.component';

describe('ExportListRowComponent', () => {
  let component: ExportListRowComponent;
  let fixture: ComponentFixture<ExportListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
