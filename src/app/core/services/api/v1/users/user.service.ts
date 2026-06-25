import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}/api/v1/users`;

  create(request: CreateUserRequest): Observable<any> {
    const url = `${this.apiUrl}`;
    const response = this.http.post(url, request);
    return response;
  }
}