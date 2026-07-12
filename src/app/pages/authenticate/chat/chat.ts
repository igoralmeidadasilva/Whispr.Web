import { afterNextRender, Component, ElementRef, inject, Injector, OnDestroy, OnInit, PLATFORM_ID, signal, viewChild } from '@angular/core';
import { UserState } from '../../../core/models/auth.model';
import { AuthManagerService } from '../../../core/services/auth-manager.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutes } from '../../../core/constants/api-routes';
import * as signalR from '@microsoft/signalr';
import { CreateMessageRequest, MessageDto } from '../../../core/models/message.model';
import { MessageService } from '../../../core/services/api/v1/messages/message.service';
import { MessageBubble } from "../../../components/features/message-bubble/message-bubble";
import { ModalComponent } from "../../../components/ui/modals/modal-component/modal-component";
import { ModalHeader } from "../../../components/ui/modals/modal-header/modal-header";
import { ModalBody } from "../../../components/ui/modals/modal-body/modal-body";
import { MessageAttachmentDto } from '../../../core/models/message-attachment.model';
import { Sizes } from '../../../core/enums/sizes';
import { ProblemDetails } from '../../../core/http/problem-details';
import { PagedModel } from '../../../core/models/page.model';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule, MessageBubble, ModalComponent, ModalHeader, ModalBody],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {
  private authManagerService: AuthManagerService = inject(AuthManagerService);
  private messageService: MessageService = inject(MessageService);
  private platformId = inject(PLATFORM_ID);
  private formBuilder = inject(FormBuilder);
  private injector = inject(Injector);

  private hubConnection: signalR.HubConnection | undefined;

  protected userState: UserState | undefined;
  protected messages = signal<MessageDto[]>([]);

  protected selectedFiles: File[] = [];
  protected readonly isSubmiting = signal<boolean>(false);

  protected readonly attachmentModal = viewChild.required<ModalComponent>('attachmentModal');
  protected readonly selectedAttachment = signal<MessageAttachmentDto>({
    id: '',
    messageId: '',
    fileName: '',
    contentType: '',
    sasUri: ''
  });

  protected readonly sizes = Sizes;

  protected readonly isLoadingHistory = signal<boolean>(false);
  protected readonly hasMoreHistory = signal<boolean>(true);
  private nextLink = signal<string | null>(null);
  private readonly PAGE_SIZE = 12;
  private readonly SCROLL_THRESHOLD = 100;

  protected readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  sendMessageForm: FormGroup = this.formBuilder.group({ message: [''], });

  get message() { return this.sendMessageForm.get('message'); }

  ngOnInit() {
    this.connect();
    this.userState = this.authManagerService.getUserState();
    this.loadInitialHistory();
  }

  ngOnDestroy() {
    this.disconnect();
  }

  private loadInitialHistory(): void {
    this.isLoadingHistory.set(true);

    this.messageService.getChatHistory({ pageNumber: 1, pageSize: this.PAGE_SIZE })
      .subscribe({
        next: (response) => {
          const ordered = [...response.items].reverse();

          this.messages.set(ordered);
          this.nextLink.set(response.next);
          this.hasMoreHistory.set(!!response.next);
          this.isLoadingHistory.set(false);

          afterNextRender(() => this.scrollToBottom(), { injector: this.injector });
        },
        error: (error) => {
          console.error('Erro ao carregar histórico de mensagens', error);
          this.isLoadingHistory.set(false);
        }
      });
  }

  protected onScroll(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    if (
      container.scrollTop <= this.SCROLL_THRESHOLD &&
      this.hasMoreHistory() &&
      !this.isLoadingHistory()
    ) {
      this.loadMoreHistory();
    }
  }

  private loadMoreHistory(): void {
    const link = this.nextLink();
    if (!link) return;

    this.isLoadingHistory.set(true);

    const container = this.scrollContainer()?.nativeElement;
    const previousScrollHeight = container?.scrollHeight ?? 0;
    const previousScrollTop = container?.scrollTop ?? 0;

    this.messageService.getPage(link).subscribe({
      next: (response: PagedModel<MessageDto>) => {
        const ordered = [...response.items].reverse();

        this.messages.update(msgs => [...ordered, ...msgs]);
        this.nextLink.set(response.next);
        this.hasMoreHistory.set(!!response.next);
        this.isLoadingHistory.set(false);

        afterNextRender(() => {
          const newContainer = this.scrollContainer()?.nativeElement;
          if (!newContainer) return;

          const newScrollHeight = newContainer.scrollHeight;
          newContainer.scrollTop = newScrollHeight - previousScrollHeight + previousScrollTop;
        }, { injector: this.injector });
      },
      error: (error: ProblemDetails) => {
        console.error('Erro ao carregar mensagens antigas', error);
        this.isLoadingHistory.set(false);
      }
    });
  }

  private scrollToBottom(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  private connect() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(ApiRoutes.Hub.Chat)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.log('Error establishing SignalR connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
      this.messages.update(msgs => [...msgs, message]);
    });
  }

  handleOnSubmit() {
    if (!this.sendMessageForm.valid) {
      return;
    }

    this.isSubmiting.set(true);

    const request: CreateMessageRequest = {
      content: this.sendMessageForm.get('message')?.value ?? '',
      files: this.selectedFiles
    };

    this.messageService.create(request).subscribe({
      next: () => {
        this.sendMessageForm.reset();
        this.selectedFiles = [];
        this.isSubmiting.set(false);
      },
      error: (response) => {
        console.error('Error trying send message', response);
        this.isSubmiting.set(false);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  handleOnAttachmentClick(attachment: MessageAttachmentDto) {
    this.selectedAttachment.set(attachment);
    this.attachmentModal().showAsync();
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}