import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { AuthToken, UserState } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  private readonly _anonymousUser: UserState = {
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
  };

  private tokenStorageService = inject(TokenStorageService);
  private platformId = inject(PLATFORM_ID);
  private currentUser: UserState = this._anonymousUser;

  getUserState(): UserState {
    if (!isPlatformBrowser(this.platformId)) {
      return this._anonymousUser;
    }

    const token = this.tokenStorageService.getAccessToken();

    if (!token) {
      this.markUserAsUnauthenticated();
      return this.currentUser;
    };

    const isDateExpired = new Date() >= new Date(token.tokenExpirationAtUtc);

    if (isDateExpired) {
      this.markUserAsUnauthenticated();
      return this.currentUser;
    }

    this.markUserAsAuthenticated(token);
    return this.currentUser;
  }

  markUserAsAuthenticated(token: AuthToken): void {
    this.tokenStorageService.setAccessToken(token);
    this.currentUser = this.buildeUserStateFromToken(token);
  }

  markUserAsUnauthenticated(): void {
    this.tokenStorageService.removeAccessToken();
    this.currentUser = this._anonymousUser;
  }

  private buildeUserStateFromToken(token: AuthToken): UserState {
    const decodedToken = jwtDecode<Record<string, any>>(token.token);
    return {
      isAuthenticated: true,
      id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] ?? null,
      name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null,
      email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ?? null,
    };
  }
}