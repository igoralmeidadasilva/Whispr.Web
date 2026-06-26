import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}/api/v1/auth`;

  login(request: LoginRequest): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const response = this.http.post(url, request);
    return response;
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    const response = this.http.post(url, {});
    return response;
  }

  refresh(): Observable<any> {
    const url = `${this.apiUrl}/refresh`;
    const response = this.http.post(url, {});
    return response;
  }
}