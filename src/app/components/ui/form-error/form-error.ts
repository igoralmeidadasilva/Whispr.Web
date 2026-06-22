import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error.html',
  styleUrl: './form-error.css',
})
export class FormError {
  control = input<AbstractControl | null>(null);
  label = input<string>();
  errorsMap = input.required<ReadonlyMap<string, string>>();

  shouldShowErrors(): boolean {
    return !!(this.control && this.control()?.invalid && this.control()?.touched);
  }

  get errorMessage(): string {
    if (!this.shouldShowErrors()) {
      return '';
    }

    const errors = this.control()?.errors;

    if (!errors) {
      return '';
    }

    const firstErrorKey = Object.keys(errors)[0];
    const error = this.errorsMap().get(firstErrorKey);

    return error || 'Campo inválido.';
  }
}