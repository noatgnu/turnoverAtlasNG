import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinTauCollectionComponent } from './protein-tau-collection.component';

describe('ProteinTauCollectionComponent', () => {
  let component: ProteinTauCollectionComponent;
  let fixture: ComponentFixture<ProteinTauCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinTauCollectionComponent]
    });
    fixture = TestBed.createComponent(ProteinTauCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
