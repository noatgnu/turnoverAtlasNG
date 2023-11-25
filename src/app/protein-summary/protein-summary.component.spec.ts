import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinSummaryComponent } from './protein-summary.component';

describe('ProteinSummaryComponent', () => {
  let component: ProteinSummaryComponent;
  let fixture: ComponentFixture<ProteinSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinSummaryComponent]
    });
    fixture = TestBed.createComponent(ProteinSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
