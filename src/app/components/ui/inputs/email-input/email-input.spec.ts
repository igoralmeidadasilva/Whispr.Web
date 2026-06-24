import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailInput } from './email-input';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('EmailInput', () => {
  let component: EmailInput;
  let fixture: ComponentFixture<EmailInput>;

  const fakeFormGroup = new FormGroup({
    email: new FormControl(''),
  });

  const fakeFormGroupDirective = {
    form: fakeFormGroup,
  } as FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailInput, ReactiveFormsModule],
      providers: [
        { provide: FormGroupDirective, useValue: fakeFormGroupDirective }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailInput);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'E-mail');
    fixture.componentRef.setInput('controlName', 'email');
    fixture.componentRef.setInput('control', fakeFormGroup.get('email'));
    fixture.componentRef.setInput('errorsMap', new Map<string, string>());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});