import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyEditDialogComponent } from './proxy-edit-dialog.component';

xdescribe('ProxyEditDialogComponent', () => {
  let component: ProxyEditDialogComponent;
  let fixture: ComponentFixture<ProxyEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
