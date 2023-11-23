import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSelectComponent } from './analysis-select.component';

describe('AnalysisSelectComponent', () => {
  let component: AnalysisSelectComponent;
  let fixture: ComponentFixture<AnalysisSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisSelectComponent]
    });
    fixture = TestBed.createComponent(AnalysisSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
