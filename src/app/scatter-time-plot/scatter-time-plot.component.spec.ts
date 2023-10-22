import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterTimePlotComponent } from './scatter-time-plot.component';

describe('ScatterTimePlotComponent', () => {
  let component: ScatterTimePlotComponent;
  let fixture: ComponentFixture<ScatterTimePlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScatterTimePlotComponent]
    });
    fixture = TestBed.createComponent(ScatterTimePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
