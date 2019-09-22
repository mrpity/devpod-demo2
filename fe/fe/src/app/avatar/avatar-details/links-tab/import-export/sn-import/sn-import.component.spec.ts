import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnImportComponent } from './sn-import.component';

describe('ImportExportComponent', () => {
  let component: SnImportComponent;
  let fixture: ComponentFixture<SnImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
