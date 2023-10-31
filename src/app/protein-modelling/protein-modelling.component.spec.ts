import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinModellingComponent } from './protein-modelling.component';

describe('ProteinModellingComponent', () => {
  let component: ProteinModellingComponent;
  let fixture: ComponentFixture<ProteinModellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinModellingComponent]
    });
    fixture = TestBed.createComponent(ProteinModellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
