import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorageService = inject(TokenStorageService);
  const isApiUrl = req.url.startsWith('/api');

  let modifiedReq = req;

  if (isApiUrl) {
    modifiedReq = req.clone({ withCredentials: true });

    const token = tokenStorageService.getAccessToken();
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
  }

  return next(modifiedReq);
};