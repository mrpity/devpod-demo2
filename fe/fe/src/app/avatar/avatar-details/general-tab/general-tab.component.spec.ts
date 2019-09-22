import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/utils';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralTabComponent } from './general-tab.component';
import { Apollo } from 'apollo-angular';

class MockApollo {}

describe('GeneralTabComponent', () => {
  let component: GeneralTabComponent;
  let fixture: ComponentFixture<GeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        SharedModule,
        TranslateModule
      ],
      declarations: [ GeneralTabComponent ],
      providers: [
        { provide: Apollo, useClass: MockApollo },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
