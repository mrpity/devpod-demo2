import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDetailsComponent } from './avatar-details.component';

xdescribe('AvatarDetailsComponent', () => {
  let component: AvatarDetailsComponent;
  let fixture: ComponentFixture<AvatarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
