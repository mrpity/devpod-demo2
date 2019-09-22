import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccupationComponent } from './add-occupation.component';

xdescribe('AddOccupationComponent', () => {
  let component: AddOccupationComponent;
  let fixture: ComponentFixture<AddOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
