import { MessageAttachmentDto } from "./message-attachment.model";
import { UserDto } from "./user.model";

export interface MessageDto {
  id: string;
  userId: string;
  user: UserDto | null; 
  content: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  attachments: MessageAttachmentDto[];
}

export interface CreateMessageRequest {
  content: string;
  files: File[];
}

export interface GetAllMessagesRequest {
  pageNumber: number,
  pageSize: number
}

export interface GetMessagesChatHistoryRequest {
  pageNumber: number,
  pageSize: number
}