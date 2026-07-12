import { Component, inject, input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal-component/modal-component';

@Component({
  selector: 'app-modal-body',
  imports: [],
  templateUrl: './modal-body.html',
  styleUrl: './modal-body.css',
})
export class ModalBody implements OnInit{
  cssClass = input<string>('')
  private parent = inject(ModalComponent, { optional: true });

  ngOnInit(): void {
    if (!this.parent) {
      throw new Error(
        `${this.constructor.name} must be used within a ModalComponent.`
      );
    }
  }

  buildCssClass(): string{
    let css = "modal-body";

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }
}