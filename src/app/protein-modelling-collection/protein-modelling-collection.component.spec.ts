import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinModellingCollectionComponent } from './protein-modelling-collection.component';

describe('ProteinModellingCollectionComponent', () => {
  let component: ProteinModellingCollectionComponent;
  let fixture: ComponentFixture<ProteinModellingCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinModellingCollectionComponent]
    });
    fixture = TestBed.createComponent(ProteinModellingCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
