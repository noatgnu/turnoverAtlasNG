import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauDatabaseDistributionComponent } from './tau-database-distribution.component';

describe('TauDatabaseDistributionComponent', () => {
  let component: TauDatabaseDistributionComponent;
  let fixture: ComponentFixture<TauDatabaseDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TauDatabaseDistributionComponent]
    });
    fixture = TestBed.createComponent(TauDatabaseDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
