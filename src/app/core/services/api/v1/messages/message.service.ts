import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '../../../../constants/api-routes';
import { Observable } from 'rxjs';
import { CreateMessageRequest } from '../../../../models/message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  create(request: CreateMessageRequest): Observable<any> {
    const response = this.http.post(ApiRoutes.V1.Messages.Create, request);
    return response;
  }
}