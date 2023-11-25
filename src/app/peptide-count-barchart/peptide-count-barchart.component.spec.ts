import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptideCountBarchartComponent } from './peptide-count-barchart.component';

describe('PeptideCountBarchartComponent', () => {
  let component: PeptideCountBarchartComponent;
  let fixture: ComponentFixture<PeptideCountBarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeptideCountBarchartComponent]
    });
    fixture = TestBed.createComponent(PeptideCountBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
