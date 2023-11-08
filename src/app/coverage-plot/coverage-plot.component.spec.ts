import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveragePlotComponent } from './coverage-plot.component';

describe('CoveragePlotComponent', () => {
  let component: CoveragePlotComponent;
  let fixture: ComponentFixture<CoveragePlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoveragePlotComponent]
    });
    fixture = TestBed.createComponent(CoveragePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
