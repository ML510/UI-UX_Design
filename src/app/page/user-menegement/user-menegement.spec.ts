import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenegement } from './user-menegement';

describe('UserMenegement', () => {
  let component: UserMenegement;
  let fixture: ComponentFixture<UserMenegement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenegement],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenegement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
