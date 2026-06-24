import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordInput } from './password-input';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('PasswordInput', () => {
  let component: PasswordInput;
  let fixture: ComponentFixture<PasswordInput>;

  const fakeFormGroup = new FormGroup({
    password: new FormControl(''),
  });

  const fakeFormGroupDirective = {
    form: fakeFormGroup,
  } as FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInput, ReactiveFormsModule],
      providers: [
        { provide: FormGroupDirective, useValue: fakeFormGroupDirective }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordInput);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Senha');
    fixture.componentRef.setInput('controlName', 'password');
    fixture.componentRef.setInput('control', fakeFormGroup.get('password'));
    fixture.componentRef.setInput('errorsMap', new Map<string, string>());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});