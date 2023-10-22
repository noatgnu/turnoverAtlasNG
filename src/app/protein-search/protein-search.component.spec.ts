import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinSearchComponent } from './protein-search.component';

describe('ProteinSearchComponent', () => {
  let component: ProteinSearchComponent;
  let fixture: ComponentFixture<ProteinSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinSearchComponent]
    });
    fixture = TestBed.createComponent(ProteinSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
