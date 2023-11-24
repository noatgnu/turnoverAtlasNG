import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauHistogramComponent } from './tau-histogram.component';

describe('TauHistogramComponent', () => {
  let component: TauHistogramComponent;
  let fixture: ComponentFixture<TauHistogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TauHistogramComponent]
    });
    fixture = TestBed.createComponent(TauHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
