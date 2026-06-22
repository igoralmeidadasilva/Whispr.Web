import { Component, computed, input, signal, viewChild } from '@angular/core';
import { Alert } from "../../ui/alerts/alert/alert";
import { ProblemAlertParameters } from "./problem-alert.parameters";
import { Colors } from '../../../core/enums/colors';
import { KeyValuePipe } from '@angular/common';


@Component({
  selector: 'app-problem-alert',
  imports: [Alert, KeyValuePipe],
  templateUrl: './problem-alert.html',
  styleUrl: './problem-alert.css',
})
export class ProblemAlert {
  private readonly alert = viewChild.required<Alert>('alert');

  protected defaultParameters: ProblemAlertParameters = {
    color: Colors.Danger,
    problem: undefined,
    errors: undefined
  };

  protected parameters = signal<ProblemAlertParameters>(this.defaultParameters);

  protected hasErrors = computed(() => {
    const errors = this.parameters().errors;
    return errors !== undefined && errors.size > 0;
  })

  id = input<string>(crypto.randomUUID());
  cssClass = input<string>('')

  show(parameters: ProblemAlertParameters) {
    this.parameters.set(parameters);
    this.alert().show();
  }

  hide() {
    this.parameters.set(this.defaultParameters);
    this.alert().hide();
  }
}
