import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinModellingCombineDialogComponent } from './protein-modelling-combine-dialog.component';

describe('ProteinModellingCombineDialogComponent', () => {
  let component: ProteinModellingCombineDialogComponent;
  let fixture: ComponentFixture<ProteinModellingCombineDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinModellingCombineDialogComponent]
    });
    fixture = TestBed.createComponent(ProteinModellingCombineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
