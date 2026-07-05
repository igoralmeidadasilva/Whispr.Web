export interface MessageDto {
  id: string;
  userId: string;
  userName: string | null;
  content: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
}

export interface CreateMessageRequest {
  userId: string;
  content: string;
}