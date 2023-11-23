import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcResultComponent } from './calc-result.component';

describe('CalcResultComponent', () => {
  let component: CalcResultComponent;
  let fixture: ComponentFixture<CalcResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalcResultComponent]
    });
    fixture = TestBed.createComponent(CalcResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
