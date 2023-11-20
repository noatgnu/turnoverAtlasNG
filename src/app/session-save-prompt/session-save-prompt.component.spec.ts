import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSavePromptComponent } from './session-save-prompt.component';

describe('SessionSavePromptComponent', () => {
  let component: SessionSavePromptComponent;
  let fixture: ComponentFixture<SessionSavePromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionSavePromptComponent]
    });
    fixture = TestBed.createComponent(SessionSavePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
