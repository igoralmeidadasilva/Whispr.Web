import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { MessageBubble } from './message-bubble';
import { MessageDto } from '../../../core/models/message.model';
import { UserState } from '../../../core/models/auth.model';
import { MessageAttachmentDto } from '../../../core/models/message-attachment.model';

describe('MessageBubble', () => {
  let component: MessageBubble;
  let fixture: ComponentFixture<MessageBubble>;

  const messageMock: MessageDto = {
    id: 'msg-1',
    userId: 'user-1',
    user: null,
    content: 'Olá, mundo!',
    createdAtUtc: new Date().toISOString(),
    updatedAtUtc: null,
    attachments: [],
  };

  const userStateMock: UserState = {
    id: 'user-1',
    name: 'Usuário Teste',
  } as UserState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBubble],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBubble);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('message', messageMock);
    fixture.componentRef.setInput('userState', userStateMock);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir onAttachmentClick com o attachment correto ao chamar onClick', () => {
    const attachmentMock: MessageAttachmentDto = {
      id: 'att-1',
      messageId: 'msg-1',
      fileName: 'foto.png',
      contentType: 'image/png',
      sasUri: 'https://exemplo.com/foto.png',
    };

    const spy = vi.fn();
    component.onAttachmentClick.subscribe(spy);

    component.onClick(attachmentMock);

    expect(spy).toHaveBeenCalledWith(attachmentMock);
  });
});