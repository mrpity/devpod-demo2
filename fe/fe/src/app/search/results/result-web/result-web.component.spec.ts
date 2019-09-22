import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWebComponent } from './result-web.component';

describe('ResultWebComponent', () => {
  let component: ResultWebComponent;
  let fixture: ComponentFixture<ResultWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
