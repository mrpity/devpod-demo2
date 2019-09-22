import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBlockItemComponent } from './about-block-item.component';

xdescribe('AboutBlockItemComponent', () => {
  let component: AboutBlockItemComponent;
  let fixture: ComponentFixture<AboutBlockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBlockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
