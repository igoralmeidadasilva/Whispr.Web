import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Message } from './chat.message';
import { UserState } from '../../../core/models/auth.model';
import { AuthManagerService } from '../../../core/services/auth-manager.service';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutes } from '../../../core/constants/api-routes';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {
  private authManagerService: AuthManagerService = inject(AuthManagerService);
  private platformId = inject(PLATFORM_ID);
  private formBuilder = inject(FormBuilder);

  private hubConnection: signalR.HubConnection | undefined;

  protected userState: UserState | undefined;
  protected messages = signal<Message[]>([]);

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

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.update(msgs => [...msgs, { UserName: user, Message: message }]);
    });
  }

  handleOnSubmit() {
    const message =this.message!.value;
    if (message && this.hubConnection) {
      this.hubConnection.invoke('SendMessage', this.userState?.name, message)
        .catch(err => console.error(err));
      this.sendMessageForm.reset();
    }
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}