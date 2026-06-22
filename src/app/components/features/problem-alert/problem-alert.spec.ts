import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemAlert } from './problem-alert';

describe('ProblemAlert', () => {
  let component: ProblemAlert;
  let fixture: ComponentFixture<ProblemAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
