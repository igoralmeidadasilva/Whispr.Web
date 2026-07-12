export interface MessageAttachmentDto {
    id: string;
    messageId: string;
    fileName: string,
    contentType: string,
    sasUri: string;
}