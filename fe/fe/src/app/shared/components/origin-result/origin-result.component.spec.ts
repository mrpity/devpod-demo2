import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OriginResultComponent} from '@app/shared/components/origin-result/origin-result.component';


xdescribe('ResultComponent', () => {
  let component: OriginResultComponent;
  let fixture: ComponentFixture<OriginResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
