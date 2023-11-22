import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewPeptideContainerCompactComponent } from './protein-view-peptide-container-compact.component';

describe('ProteinViewPeptideContainerCompactComponent', () => {
  let component: ProteinViewPeptideContainerCompactComponent;
  let fixture: ComponentFixture<ProteinViewPeptideContainerCompactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewPeptideContainerCompactComponent]
    });
    fixture = TestBed.createComponent(ProteinViewPeptideContainerCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
