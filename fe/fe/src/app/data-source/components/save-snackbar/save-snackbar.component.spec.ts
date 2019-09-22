import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSnackbarComponent } from './save-snackbar.component';

xdescribe('SaveSnackbarComponent', () => {
  let component: SaveSnackbarComponent;
  let fixture: ComponentFixture<SaveSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
