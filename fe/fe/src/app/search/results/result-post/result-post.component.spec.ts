import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPostComponent } from './result-post.component';

describe('ResultPostComponent', () => {
  let component: ResultPostComponent;
  let fixture: ComponentFixture<ResultPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
