import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageDto } from '../../../core/models/message.model';
import { UserState } from '../../../core/models/auth.model';

@Component({
  selector: 'app-message-bubble',
  imports: [NgClass],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.css',
})
export class MessageBubble {
  message = input.required<MessageDto>();
  userState = input.required<UserState>();
}