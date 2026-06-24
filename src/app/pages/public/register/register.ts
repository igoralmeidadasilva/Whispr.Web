import { Component, inject, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardContainer } from "../../../components/features/card-container/card-container";
import { Constraints } from '../../../core/constants/constraints';
import { TextInput } from "../../../components/ui/inputs/text-input/text-input";
import { PasswordInput } from "../../../components/ui/inputs/password-input/password-input";
import { Button } from "../../../components/ui/buttons/button/button";
import { ButtonTypes } from '../../../components/ui/buttons/button/button.type';
import { AppRoutes } from '../../../core/constants/app-routes';
import { Colors } from '../../../core/enums/colors';
import { UserService } from '../../../core/services/api/v1/users/user.service';
import { ProblemAlert } from "../../../components/features/problem-alert/problem-alert";
import { ProblemDetails } from '../../../core/http/problem-details';
import { EmailInput } from "../../../components/ui/inputs/email-input/email-input";
import { CreateUserRequest } from '../../../core/models/user.model';

interface RegisterForm {
  userName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

const userNameErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['minlength', `O nome deve ter no mínimo ${Constraints.User.USER_NAME_MIN_LENGTH} caracteres.`],
  ['maxlength', `O nome deve ter no máximo ${Constraints.User.USER_NAME_MAX_LENGTH} caracteres.`],
]);

const emailErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['email', 'Insira um e-mail válido.'],
]);

const passwordErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['minlength', `A senha deve ter no mínimo ${Constraints.User.PASSWORD_MIN_LENGTH} caracteres.`],
  ['maxlength', `A senha deve ter no máximo ${Constraints.User.PASSWORD_MAX_LENGTH} caracteres.`],
]);

const confirmPasswordErrors: ReadonlyMap<string, string> = new Map([
  ['required', 'Este campo é obrigatório.'],
  ['minlength', `A confirmação deve ter no mínimo ${Constraints.User.PASSWORD_MIN_LENGTH} caracteres.`],
  ['maxlength', `A confirmação deve ter no máximo ${Constraints.User.PASSWORD_MAX_LENGTH} caracteres.`],
]);

@Component({
  selector: 'app-register',
  imports: [CardContainer, ReactiveFormsModule, TextInput, PasswordInput, Button, ProblemAlert, ProblemAlert, EmailInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  private readonly alert = viewChild.required<ProblemAlert>('alert');

  protected readonly buttonTypes = ButtonTypes;
  protected readonly colors = Colors;
  protected readonly appRoutes = AppRoutes;
  protected readonly isLoading = signal<boolean>(false);
  protected readonly userNameErrors = userNameErrors;
  protected readonly emailErrors = emailErrors;
  protected readonly passwordErrors = passwordErrors;
  protected readonly confirmPasswordErrors = confirmPasswordErrors;

  registerForm: FormGroup<RegisterForm> = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(Constraints.User.USER_NAME_MIN_LENGTH), Validators.maxLength(Constraints.User.USER_NAME_MAX_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(Constraints.User.PASSWORD_MIN_LENGTH), Validators.maxLength(Constraints.User.PASSWORD_MAX_LENGTH)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(Constraints.User.PASSWORD_MIN_LENGTH), Validators.maxLength(Constraints.User.PASSWORD_MAX_LENGTH)]]
  });

  get userName() { return this.registerForm.get('userName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  handleOnSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    this.isLoading.set(true);

    const request: CreateUserRequest = {
      userName: this.userName!.value!,
      email: this.email!.value!,
      password: this.password!.value!,
      confirmPassword: this.confirmPassword!.value! 
    };

    this.userService.create(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl(AppRoutes.Login);
      },
      error: (response) => {
        const problem = response.error as ProblemDetails;

        this.alert().show({
          color: Colors.Danger,
          problem: problem.detail ?? 'Erro inesperado',
          errors: problem.errors 
            ? new Map(Object.entries(problem.errors))
            : undefined
        });

        this.isLoading.set(false);
      }
    });
  }

  handleOnReset() {
    this.alert().hide()
  }
}