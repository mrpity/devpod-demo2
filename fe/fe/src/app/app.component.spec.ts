import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from '@app/main/components/sidebar/sidebar.component';
import { Apollo } from 'apollo-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent
      ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [Apollo]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
