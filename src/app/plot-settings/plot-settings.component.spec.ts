import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotSettingsComponent } from './plot-settings.component';

describe('PlotSettingsComponent', () => {
  let component: PlotSettingsComponent;
  let fixture: ComponentFixture<PlotSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlotSettingsComponent]
    });
    fixture = TestBed.createComponent(PlotSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
