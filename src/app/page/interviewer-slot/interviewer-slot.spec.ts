import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerSlot } from './interviewer-slot';

describe('InterviewerSlot', () => {
  let component: InterviewerSlot;
  let fixture: ComponentFixture<InterviewerSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewerSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewerSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
