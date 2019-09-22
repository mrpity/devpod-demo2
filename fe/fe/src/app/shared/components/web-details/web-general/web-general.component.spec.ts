import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebGeneralComponent } from './web-general.component';

describe('WebGeneralComponent', () => {
  let component: WebGeneralComponent;
  let fixture: ComponentFixture<WebGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
