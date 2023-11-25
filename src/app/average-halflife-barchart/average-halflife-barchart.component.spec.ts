import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageHalflifeBarchartComponent } from './average-halflife-barchart.component';

describe('AverageHalflifeBarchartComponent', () => {
  let component: AverageHalflifeBarchartComponent;
  let fixture: ComponentFixture<AverageHalflifeBarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AverageHalflifeBarchartComponent]
    });
    fixture = TestBed.createComponent(AverageHalflifeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
