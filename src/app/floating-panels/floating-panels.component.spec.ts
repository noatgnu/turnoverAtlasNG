import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingPanelsComponent } from './floating-panels.component';

describe('FloatingPanelsComponent', () => {
  let component: FloatingPanelsComponent;
  let fixture: ComponentFixture<FloatingPanelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatingPanelsComponent]
    });
    fixture = TestBed.createComponent(FloatingPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
