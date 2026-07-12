import { Sizes } from '../../../../core/enums/sizes';
import { 
  Component, 
  afterNextRender,
  ElementRef, 
  AfterViewInit, 
  OnDestroy, 
  input, 
  viewChild, 
  output,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-modal-component',
  imports: [],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css',
})
export class ModalComponent implements OnDestroy {
  modalRef = viewChild<ElementRef<HTMLDivElement>>('modalRef');

  id = input<string>(crypto.randomUUID())
  cssClass = input<string>('');
  size = input<Sizes>(Sizes.None);
  isStatic = input<boolean>(false);
  
  onShow = output<void>();
  onShown = output<void>();
  onHide = output<void>();
  onHidden = output<void>();

  modalSizeClass = computed(() => {
    if (this.size() === Sizes.None) {
      return ''
    }
    return ` modal-${this.size()}`
  });

  private bootstrapModal: any;

constructor() {
    afterNextRender(async () => {
      const element = this.modalRef()?.nativeElement;

      if (element) {
        element.addEventListener('show.bs.modal', () => this.onShow.emit());
        element.addEventListener('shown.bs.modal', () => this.onShown.emit());
        element.addEventListener('hide.bs.modal', () => this.onHide.emit());
        element.addEventListener('hidden.bs.modal', () => this.onHidden.emit());

        const { Modal } = await import('bootstrap');
        this.bootstrapModal = new Modal(element);
      }
    });
  }

  buildCssClass(): string{
    let css = "modal fade";

    if (this.cssClass() !== '') {
      css += ` ${this.cssClass()}`;
    }

    return css.trim();
  }

  showAsync(): void {
    this.bootstrapModal?.show();
  }

  hideAsync(): void {
    this.bootstrapModal?.hide();
  }

  ngOnDestroy(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.dispose();
    }
  }
}