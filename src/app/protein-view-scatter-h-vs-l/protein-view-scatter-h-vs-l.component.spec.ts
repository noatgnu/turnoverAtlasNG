import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinViewScatterHVsLComponent } from './protein-view-scatter-h-vs-l.component';

describe('ProteinViewScatterHVsLComponent', () => {
  let component: ProteinViewScatterHVsLComponent;
  let fixture: ComponentFixture<ProteinViewScatterHVsLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinViewScatterHVsLComponent]
    });
    fixture = TestBed.createComponent(ProteinViewScatterHVsLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
