import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDiffTableComponent } from './export-diff-table.component';

describe('ExportDiffTableComponent', () => {
  let component: ExportDiffTableComponent;
  let fixture: ComponentFixture<ExportDiffTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDiffTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDiffTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
