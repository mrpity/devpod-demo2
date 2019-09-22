import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteNewComponent } from './chips-autocomplete.component';
import { MatIconModule } from '@angular/material/icon';

xdescribe('ChipsAutocompleteComponent', () => {
  let component: ChipsAutocompleteNewComponent;
  let fixture: ComponentFixture<ChipsAutocompleteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteNewComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
