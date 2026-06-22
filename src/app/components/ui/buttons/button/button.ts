import { Component, computed, input, output } from '@angular/core';
import { Colors } from '../../../../core/enums/colors';
import { ButtonTypes } from './button.type';


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  id = input<string>(crypto.randomUUID());
  type = input<ButtonTypes>(ButtonTypes.Button);
  color = input<Colors>(Colors.Primary);
  outline = input<boolean>(false)
  cssClass = input<string>('')
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  onClick = output<MouseEvent>();

  isLoadingOrDisabled = computed(() => {
    return this.disabled() || this.loading();
  })

  buildCssClass(): string{
    let css = "btn";

    if (this.color() !== Colors.None) {
      css += ` btn-`;
      if (this.outline()) {
        css += `outline-`;
      }
      css += this.color();
    }

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }

  handleOnClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
  }
}