import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewPeptideContainerComponent } from './protein-view-peptide-container.component';

describe('ProteinViewPeptideContainerComponent', () => {
  let component: ProteinViewPeptideContainerComponent;
  let fixture: ComponentFixture<ProteinViewPeptideContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewPeptideContainerComponent]
    });
    fixture = TestBed.createComponent(ProteinViewPeptideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
