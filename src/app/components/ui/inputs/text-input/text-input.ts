import { Component, computed, inject, input } from '@angular/core';
import { FormError } from "../../form-error/form-error";
import { AbstractControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, FormError],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {
  formGroupDirective = inject(FormGroupDirective);

  id = input<string>(crypto.randomUUID());
  label = input.required<string>();
  controlName = input.required<string>();
  control = input.required<AbstractControl | null>();
  
  errorsMap = input<ReadonlyMap<string, string>>();
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
}