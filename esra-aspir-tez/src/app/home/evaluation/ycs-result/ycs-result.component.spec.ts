import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YcsResultComponent } from './ycs-result.component';

describe('YcsResultComponent', () => {
  let component: YcsResultComponent;
  let fixture: ComponentFixture<YcsResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YcsResultComponent]
    });
    fixture = TestBed.createComponent(YcsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
