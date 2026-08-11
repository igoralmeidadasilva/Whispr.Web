import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageDto } from '../../../core/models/message.model';
import { UserState } from '../../../core/models/auth.model';
import { MessageAttachmentDto } from '../../../core/models/message-attachment.model';
import { AudioPlayer } from "../../ui/audio-player/audio-player";

@Component({
  selector: 'app-message-bubble',
  imports: [NgClass, AudioPlayer],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.css',
})
export class MessageBubble {
  message = input.required<MessageDto>();
  userState = input.required<UserState>();

  onAttachmentClick = output<MessageAttachmentDto>();

  onClick(attachment: MessageAttachmentDto) {
    this.onAttachmentClick.emit(attachment);
  }

  isImage(contentType: string): boolean {
    return contentType?.startsWith('image/');
  }

  isAudio(contentType: string): boolean {
    return contentType?.startsWith('audio/');
  }
}