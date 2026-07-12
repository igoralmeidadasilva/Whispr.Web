import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, viewChild } from '@angular/core';
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

  sendMessageForm: FormGroup = this.formBuilder.group({ message: [''], });

  get message() { return this.sendMessageForm.get('message'); }

  ngOnInit() {
    this.connect();
    this.userState = this.authManagerService.getUserState();

    // this.messageService.getAll({ pageNumber: 1, pageSize: 12 })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response)
    //     },
    //     error: (error) => {
    //       console.log(error)
    //     }
    //   });
  }

  ngOnDestroy() {
    this.disconnect();
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