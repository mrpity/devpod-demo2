import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SnLinkComponent } from './sn-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

class MockApollo {}

describe('SnLinkComponent', () => {
  let component: SnLinkComponent;
  let fixture: ComponentFixture<SnLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        TranslateModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ SnLinkComponent ],
      providers: [
        { provide: Apollo, useClass: MockApollo },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnLinkComponent);
    component = fixture.componentInstance;
    component.snName = 'atata';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
