import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YcsComponent } from './ycs.component';

describe('YcsComponent', () => {
  let component: YcsComponent;
  let fixture: ComponentFixture<YcsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YcsComponent]
    });
    fixture = TestBed.createComponent(YcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
