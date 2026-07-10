import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '../../../../constants/api-routes';
import { Observable } from 'rxjs';
import { CreateMessageRequest, GetAllMessagesRequest } from '../../../../models/message.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  getAll(request: GetAllMessagesRequest): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        pageNumber: request.pageNumber.toString(),
        pageSize: request.pageSize.toString(), 
      }
    });
    const response = this.http.get(ApiRoutes.V1.Messages.GetAll, { params });
    return response;
  }

  create(request: CreateMessageRequest): Observable<any> {
    const formData = new FormData();

    formData.append('content', request.content);

    if (request.files && request.files.length > 0) {
      request.files.forEach(file => {
        formData.append('attachments', file, file.name);
      });
    }

    return this.http.post(ApiRoutes.V1.Messages.Create, formData);
  }
}