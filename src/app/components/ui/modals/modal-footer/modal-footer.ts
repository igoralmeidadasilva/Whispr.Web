import { Component, inject, input, output } from '@angular/core';
import { Colors } from '../../../../core/enums/colors';
import { ModalComponent } from '../modal-component/modal-component';
import { Button } from "../../buttons/button/button";

@Component({
  selector: 'app-modal-footer',
  imports: [Button],
  templateUrl: './modal-footer.html',
  styleUrl: './modal-footer.css',
})
export class ModalFooter {
  cssClass = input<string>('');
  showCancelButton = input<boolean>(true);
  cancelLabel = input<string>('Cancelar');
  showConfirmButton = input<boolean>(true);
  confirmLabel = input<string>('Confirmar');
  confirmColor = input<Colors>(Colors.Primary);
  cancelColor = input<Colors>(Colors.Secondary);

  onConfirm = output<void>();

  private parent = inject(ModalComponent, { optional: true });

  ngOnInit(): void {
    if (!this.parent) {
      throw new Error(
        `${this.constructor.name} must be used within a ModalComponent.`
      );
    }
  }

  handleClickBtnClose(): void {
    this.parent?.hideAsync();
  }

  handleClickBtnConfirm(): void {
    this.onConfirm.emit();
  }

  buildCssClass(): string{
    let css = "modal-footer";

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }
}