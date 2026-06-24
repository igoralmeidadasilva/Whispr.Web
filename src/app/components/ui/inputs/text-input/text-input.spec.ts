import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInput } from './text-input';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('TextInput', () => {
  let component: TextInput;
  let fixture: ComponentFixture<TextInput>;

  const fakeFormGroup = new FormGroup({
    text: new FormControl(''),
  });

  const fakeFormGroupDirective = {
    form: fakeFormGroup,
  } as FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInput, ReactiveFormsModule],
      providers: [
        { provide: FormGroupDirective, useValue: fakeFormGroupDirective }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TextInput);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Texto');
    fixture.componentRef.setInput('controlName', 'text');
    fixture.componentRef.setInput('control', fakeFormGroup.get('text'));
    fixture.componentRef.setInput('errorsMap', new Map<string, string>());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});