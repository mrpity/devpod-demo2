import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarSearchRequestComponent } from './snack-bar-search-request.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

xdescribe('SnackBarComponent', () => {
  let component: SnackBarSearchRequestComponent;
  let fixture: ComponentFixture<SnackBarSearchRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarSearchRequestComponent ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: [] },
        { provide: MatSnackBarRef, useValue: [] },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarSearchRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
