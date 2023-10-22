import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewTissueBasedComponent } from './protein-view-tissue-based.component';

describe('ProteinViewTissueBasedComponent', () => {
  let component: ProteinViewTissueBasedComponent;
  let fixture: ComponentFixture<ProteinViewTissueBasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewTissueBasedComponent]
    });
    fixture = TestBed.createComponent(ProteinViewTissueBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
