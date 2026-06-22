import { Component, computed, inject, input, signal } from '@angular/core';
import { FormError } from "../../form-error/form-error";
import { AbstractControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [ReactiveFormsModule, FormError],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput {
  formGroupDirective = inject(FormGroupDirective);

  id = input<string>(crypto.randomUUID());
  label = input.required<string>();
  controlName = input.required<string>();
  control = input.required<AbstractControl | null>();
  errorsMap = input.required<ReadonlyMap<string, string>>();

  isRequired = input<boolean>(false);
  isDisabled = input<boolean>(false);
  hideErrors = input<boolean>(false);
  cssClass = input<string>('');
  wrapperCssClass = input<string>('');

  inputClass = computed(() => {
    const extra = this.cssClass().trim();
    return extra ? `form-control ${extra}` : 'form-control';
  });

  wrapperClass = computed(() => {
    const extra = this.wrapperCssClass().trim();
    return extra ? `form-floating ${extra}` : 'form-floating';
  });

  type = computed(() => {
    return this._showPassword() ? "text" : "password";
  });

  ariaLabel = computed(() => {
    return this._showPassword() ? "Ocultar senha" : "Revelar senha";
  });

  _showPassword = signal<boolean>(false);

  togglePasswordVisibility() {
    this._showPassword.set(!this._showPassword());
  }
}