import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOriginsComponent } from './post-origins.component';

describe('PostOriginsComponent', () => {
  let component: PostOriginsComponent;
  let fixture: ComponentFixture<PostOriginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOriginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOriginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
