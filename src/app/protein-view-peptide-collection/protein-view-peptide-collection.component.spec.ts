import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewPeptideCollectionComponent } from './protein-view-peptide-collection.component';

describe('ProteinViewPeptideCollectionComponent', () => {
  let component: ProteinViewPeptideCollectionComponent;
  let fixture: ComponentFixture<ProteinViewPeptideCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewPeptideCollectionComponent]
    });
    fixture = TestBed.createComponent(ProteinViewPeptideCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
