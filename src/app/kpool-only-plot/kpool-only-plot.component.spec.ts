import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpoolOnlyPlotComponent } from './kpool-only-plot.component';

describe('KpoolOnlyPlotComponent', () => {
  let component: KpoolOnlyPlotComponent;
  let fixture: ComponentFixture<KpoolOnlyPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KpoolOnlyPlotComponent]
    });
    fixture = TestBed.createComponent(KpoolOnlyPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
