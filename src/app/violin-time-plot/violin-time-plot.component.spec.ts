import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolinTimePlotComponent } from './violin-time-plot.component';

describe('ViolinTimePlotComponent', () => {
  let component: ViolinTimePlotComponent;
  let fixture: ComponentFixture<ViolinTimePlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViolinTimePlotComponent]
    });
    fixture = TestBed.createComponent(ViolinTimePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
