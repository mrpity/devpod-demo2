import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {SidebarComponent} from '@app/main/components/sidebar/sidebar.component';
import {RouterTestingModule} from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {AuthService} from '@app/core/services/auth.service';

xdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        MainComponent,
        SidebarComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthService, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
