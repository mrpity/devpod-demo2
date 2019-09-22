import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteComponent } from './chips-autocomplete.component';
import { MatIconModule } from '@angular/material/icon';

xdescribe('ChipsAutocompleteComponent', () => {
  let component: ChipsAutocompleteComponent;
  let fixture: ComponentFixture<ChipsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
