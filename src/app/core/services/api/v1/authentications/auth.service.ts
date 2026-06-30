import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../../models/auth.model';
import { ApiRoutes } from '../../../../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<any> {
    const response = this.http.post(ApiRoutes.V1.Auth.Login, request);
    return response;
  }

  logout(): Observable<any> {
    const response = this.http.post(ApiRoutes.V1.Auth.Logout, {});
    return response;
  }

  refresh(): Observable<any> {
    const response = this.http.post(ApiRoutes.V1.Auth.Refresh, {});
    return response;
  }
}