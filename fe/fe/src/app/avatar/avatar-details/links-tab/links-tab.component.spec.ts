import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinksTabComponent } from './links-tab.component';
import { Apollo } from 'apollo-angular';

class MockApollo {}

describe('LinksTabComponent', () => {
  let component: LinksTabComponent;
  let fixture: ComponentFixture<LinksTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        TranslateModule
      ],
      declarations: [ LinksTabComponent ],
      providers: [
        { provide: Apollo, useClass: MockApollo },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
