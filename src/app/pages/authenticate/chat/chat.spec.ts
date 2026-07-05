import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chat } from './chat';
import { AuthManagerService } from '../../../core/services/auth-manager.service';
import { MessageService } from '../../../core/services/api/v1/messages/message.service';
import { of } from 'rxjs';

describe('Chat Component', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;

  const mockAuthManagerService = {
    getUserState: vi.fn().mockReturnValue({ id: '123', name: 'Test User' })
  };

  const mockMessageService = {
    create: vi.fn().mockReturnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        { provide: AuthManagerService, useValue: mockAuthManagerService },
        { provide: MessageService, useValue: mockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});