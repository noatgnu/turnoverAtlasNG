import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewComponent } from './protein-view.component';

describe('ProteinViewComponent', () => {
  let component: ProteinViewComponent;
  let fixture: ComponentFixture<ProteinViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewComponent]
    });
    fixture = TestBed.createComponent(ProteinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
