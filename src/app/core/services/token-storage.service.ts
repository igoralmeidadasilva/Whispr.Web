import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthToken } from '../models/auth.model';
import { LocalStorageKeys } from '../constants/localStorageKeys';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  getAccessToken(): AuthToken | null {
    if (this.isBrowser) {
      const tokenJson = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
      
      if (!tokenJson) {
        return null;
      }

      try {
        return JSON.parse(tokenJson) as AuthToken;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }

  setAccessToken(token: AuthToken): void {
    if (this.isBrowser) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, JSON.stringify(token));
    }
  }

  removeAccessToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    }
  }
}