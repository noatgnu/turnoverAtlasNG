import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergePromptComponent } from './merge-prompt.component';

describe('MergePromptComponent', () => {
  let component: MergePromptComponent;
  let fixture: ComponentFixture<MergePromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MergePromptComponent]
    });
    fixture = TestBed.createComponent(MergePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
