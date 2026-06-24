import { Component, inject, signal, viewChild } from '@angular/core';
import { CardContainer } from "../../../components/features/card-container/card-container";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/api/v1/users/user.service';
import { Constraints } from '../../../core/constants/constraints';
import { PasswordInput } from "../../../components/ui/inputs/password-input/password-input";
import { AppRoutes } from '../../../core/constants/app-routes';
import { Button } from "../../../components/ui/buttons/button/button";
import { ButtonTypes } from '../../../components/ui/buttons/button/button.type';
import { Colors } from '../../../core/enums/colors';
import { ProblemAlert } from "../../../components/features/problem-alert/problem-alert";
import { EmailInput } from "../../../components/ui/inputs/email-input/email-input";

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

const emailErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['email', 'Insira um e-mail válido.'],
]);

const passwordErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['minlength', `A senha deve ter no mínimo ${Constraints.User.PASSWORD_MIN_LENGTH} caracteres.`],
  ['maxlength', `A senha deve ter no máximo ${Constraints.User.PASSWORD_MAX_LENGTH} caracteres.`],
]);

@Component({
  selector: 'app-login',
  imports: [CardContainer, ReactiveFormsModule, PasswordInput, Button, ProblemAlert, EmailInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  private readonly alert = viewChild.required<ProblemAlert>('alert');

  protected readonly appRoutes = AppRoutes;
  protected readonly emailErrors = emailErrors;
  protected readonly passwordErrors = passwordErrors;
  protected readonly buttonTypes = ButtonTypes;
  protected readonly colors = Colors;
  protected readonly isLoading = signal<boolean>(false);
  
  loginForm: FormGroup<LoginForm> = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(Constraints.User.PASSWORD_MIN_LENGTH), Validators.maxLength(Constraints.User.PASSWORD_MAX_LENGTH)]],
  });
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  handleOnSubmit() {
   if (!this.loginForm.valid) {
      return;
    }

    // TODO: implementate login loigic here

  }

  handleOnReset() {
    this.alert().hide()
  }
}