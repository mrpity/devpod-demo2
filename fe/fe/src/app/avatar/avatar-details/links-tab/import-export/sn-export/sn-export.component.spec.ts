import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnExportComponent } from './sn-export.component';

xdescribe('ImportExportComponent', () => {
  let component: SnExportComponent;
  let fixture: ComponentFixture<SnExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
