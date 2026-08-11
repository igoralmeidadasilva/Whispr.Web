import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordButton } from './record-button';

describe('RecordButton', () => {
  let component: RecordButton;
  let fixture: ComponentFixture<RecordButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
