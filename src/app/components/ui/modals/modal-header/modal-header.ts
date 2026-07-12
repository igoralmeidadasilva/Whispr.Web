import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Colors } from '../../../../core/enums/colors';
import { ModalComponent } from '../modal-component/modal-component';

@Component({
  selector: 'app-modal-header',
  imports: [],
  templateUrl: './modal-header.html',
  styleUrl: './modal-header.css',
})
export class ModalHeader implements OnInit {
  title = input<string>('');
  color = input<Colors>(Colors.None);
  cssClass = input<string>('');

  private parent = inject(ModalComponent, { optional: true });

  headerClasses = computed(() => {
    const bg = this.getBgCss(this.color());
    const text = this.getTextColor(this.color());
    return `modal-header ${bg} ${text} ${this.cssClass()}`.trim();
  });

  btnClasses = computed(() => {
    const btnColor = this.getBtnCloseColor(this.color());
    return `btn-close ${btnColor}`.trim();
  });

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

  private getBgCss(color: Colors): string {
    if (color === Colors.None) return '';
    return `bg-${color}`;
  }

  private getTextColor(color: Colors): string {
    if (color === Colors.None) return '';
    return color === 'primary' || color === 'danger' ? 'text-white' : 'text-dark';
  }

  private getBtnCloseColor(color: Colors): string {
    return color !== Colors.None ? 'btn-close-white' : '';
  }
}