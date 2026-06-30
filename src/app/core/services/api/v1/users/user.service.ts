import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../../../models/user.model';
import { ApiRoutes } from '../../../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  create(request: CreateUserRequest): Observable<any> {
    const response = this.http.post(ApiRoutes.V1.Users.Create, request);
    return response;
  }
}