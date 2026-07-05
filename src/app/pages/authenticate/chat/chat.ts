import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { UserState } from '../../../core/models/auth.model';
import { AuthManagerService } from '../../../core/services/auth-manager.service';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutes } from '../../../core/constants/api-routes';
import * as signalR from '@microsoft/signalr';
import { CreateMessageRequest, MessageDto } from '../../../core/models/message.model';
import { MessageService } from '../../../core/services/api/v1/messages/message.service';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
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

  sendMessageForm: FormGroup = this.formBuilder.group({ message: [''], });

  get message() { return this.sendMessageForm.get('message'); }

  ngOnInit() {
    this.connect();
    this.userState = this.authManagerService.getUserState();
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
    
    const request: CreateMessageRequest = {
      userId: this.userState?.id ?? '',
      content: this.sendMessageForm.get('message')?.value ?? ''
    };

    this.messageService.create(request).subscribe({
      next: () => {
        this.sendMessageForm.reset();
      },
      error: (response) => {
        console.error('Error trying send message', response);
      }
    });
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}