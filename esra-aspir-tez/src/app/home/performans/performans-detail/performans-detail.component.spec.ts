import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformansDetailComponent } from './performans-detail.component';

describe('PerformansDetailComponent', () => {
  let component: PerformansDetailComponent;
  let fixture: ComponentFixture<PerformansDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformansDetailComponent]
    });
    fixture = TestBed.createComponent(PerformansDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
