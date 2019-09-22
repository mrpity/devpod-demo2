import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListTabComponent } from './notification-list-tab.component';

describe('NotificationListTabComponent', () => {
  let component: NotificationListTabComponent;
  let fixture: ComponentFixture<NotificationListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
