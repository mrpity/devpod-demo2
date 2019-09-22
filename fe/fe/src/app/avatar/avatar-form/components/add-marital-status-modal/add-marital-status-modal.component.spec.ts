import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaritalStatusModalComponent } from './add-marital-status-modal.component';

xdescribe('AddMaritalStatusModalComponent', () => {
  let component: AddMaritalStatusModalComponent;
  let fixture: ComponentFixture<AddMaritalStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaritalStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaritalStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
