import { Component, input, signal } from '@angular/core';
import { Colors } from '../../../../core/enums/colors';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  id = input<string>(crypto.randomUUID());
  color = input<Colors>(Colors.Primary);
  cssClass = input<string>('')
  isDismissable = input<boolean>(true);

  protected isShow = signal<boolean>(false);

  show() {
    this.isShow.set(true);
  }

  hide() {
    this.isShow.set(false);
  }

  toggle() {
    this.isShow.update(value => !value);
  }

  buildCssClass(): string{
    let css = `alert alert-${this.color()} alert-dismissible fade show border-0 border-start border-3 border-${this.color()} rounded-0 py-3 m-0`;

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }
}