import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeolocationModalComponent } from './add-geolocation-modal.component';

xdescribe('AddEducationModalComponent', () => {
  let component: AddGeolocationModalComponent;
  let fixture: ComponentFixture<AddGeolocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGeolocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGeolocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
