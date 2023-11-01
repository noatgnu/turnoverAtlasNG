import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinTauDistributionComponent } from './protein-tau-distribution.component';

describe('ProteinTauDistributionComponent', () => {
  let component: ProteinTauDistributionComponent;
  let fixture: ComponentFixture<ProteinTauDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinTauDistributionComponent]
    });
    fixture = TestBed.createComponent(ProteinTauDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
