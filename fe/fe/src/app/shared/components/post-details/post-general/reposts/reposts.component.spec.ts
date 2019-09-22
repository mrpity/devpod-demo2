import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepostsComponent } from './reposts.component';

describe('RepostsComponent', () => {
  let component: RepostsComponent;
  let fixture: ComponentFixture<RepostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
