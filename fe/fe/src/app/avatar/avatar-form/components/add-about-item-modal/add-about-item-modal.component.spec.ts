import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAboutItemModalComponent } from './add-about-item-modal.component';

xdescribe('AddAboutItemModalComponent', () => {
  let component: AddAboutItemModalComponent;
  let fixture: ComponentFixture<AddAboutItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAboutItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAboutItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
