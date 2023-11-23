import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcSelectComponent } from './calc-select.component';

describe('CalcSelectComponent', () => {
  let component: CalcSelectComponent;
  let fixture: ComponentFixture<CalcSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalcSelectComponent]
    });
    fixture = TestBed.createComponent(CalcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
