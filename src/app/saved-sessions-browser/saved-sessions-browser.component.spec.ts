import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSessionsBrowserComponent } from './saved-sessions-browser.component';

describe('SavedSessionsBrowserComponent', () => {
  let component: SavedSessionsBrowserComponent;
  let fixture: ComponentFixture<SavedSessionsBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedSessionsBrowserComponent]
    });
    fixture = TestBed.createComponent(SavedSessionsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
