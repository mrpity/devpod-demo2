import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideDiffTableComponent } from './override-diff-table.component';

xdescribe('OverrideDiffTableComponent', () => {
  let component: OverrideDiffTableComponent;
  let fixture: ComponentFixture<OverrideDiffTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverrideDiffTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideDiffTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
