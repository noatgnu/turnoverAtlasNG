import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantSelectorComponent } from './variant-selector.component';

describe('VariantSelectorComponent', () => {
  let component: VariantSelectorComponent;
  let fixture: ComponentFixture<VariantSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariantSelectorComponent]
    });
    fixture = TestBed.createComponent(VariantSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
