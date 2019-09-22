import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyAddDialogComponent } from './proxy-add-dialog.component';

xdescribe('ProxyEditDialogComponent', () => {
  let component: ProxyAddDialogComponent;
  let fixture: ComponentFixture<ProxyAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
