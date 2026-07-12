import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

import { Chat } from './chat';
import { AuthManagerService } from '../../../core/services/auth-manager.service';
import { MessageService } from '../../../core/services/api/v1/messages/message.service';

const hubConnectionMock = {
  start: vi.fn().mockResolvedValue(undefined),
  on: vi.fn(),
  stop: vi.fn().mockResolvedValue(undefined),
};

const hubConnectionBuilderMock = {
  withUrl: vi.fn().mockReturnThis(),
  build: vi.fn().mockReturnValue(hubConnectionMock),
};

vi.mock('@microsoft/signalr', () => {
  return {
    HubConnectionBuilder: vi.fn().mockImplementation(function () {
      return hubConnectionBuilderMock;
    }),
  };
});

const modalInstanceMock = {
  show: vi.fn(),
  hide: vi.fn(),
  dispose: vi.fn(),
};

vi.mock('bootstrap', () => {
  return {
    Modal: vi.fn().mockImplementation(function () {
      return modalInstanceMock;
    }),
  };
});

describe('Chat', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;

  const authManagerServiceMock = {
    getUserState: vi.fn().mockReturnValue({
      id: 'user-1',
      name: 'Usuário Teste',
    }),
  };

  const messageServiceMock = {
    getChatHistory: vi.fn().mockReturnValue(
      of({ items: [], totalCount: 0, next: null, previous: null })
    ),
    getPage: vi.fn(),
    create: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        { provide: AuthManagerService, useValue: authManagerServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});