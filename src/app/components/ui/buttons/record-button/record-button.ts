import { Component, computed, input, signal } from '@angular/core';
import { Colors } from '../../../../core/enums/colors';

@Component({
  selector: 'app-record-button',
  imports: [],
  templateUrl: './record-button.html',
  styleUrl: './record-button.css',
})
export class RecordButton {
  id = input<string>(crypto.randomUUID());
  cssClass = input<string>('')

  color = signal<Colors>(Colors.Primary);
  isRecording = signal<boolean>(false);

  buildCssClass(): string{
    let css = "btn";

    if (this.color() !== Colors.None) {
      css += ` btn-`;

      css += this.color();
    }

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }

  private toggle() {
    this.isRecording.set(!this.isRecording());

    if (this.isRecording()) {
      this.color.set(Colors.Danger);
      return 
    }

    this.color.set(Colors.Primary);
  }

  handleOnClick(event: MouseEvent): void {
    this.toggle();

  }
}