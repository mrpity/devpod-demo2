import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebOriginsComponent } from './web-origins.component';

describe('WebOriginsComponent', () => {
  let component: WebOriginsComponent;
  let fixture: ComponentFixture<WebOriginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebOriginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebOriginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
