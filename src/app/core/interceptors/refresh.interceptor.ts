import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/api/v1/authentications/auth.service';
import { AuthToken } from '../models/auth.model';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthManagerService } from '../services/auth-manager.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../constants/app-routes';

let isRefreshing = false;
const refreshedTokenSubject = new BehaviorSubject<AuthToken | null>(null);

function isAuthRouteExceptLogout(url: string): boolean {
  return url.includes('/auth/') && !url.includes('/auth/logout');
}

function cloneWithToken(req: HttpRequest<unknown>, token: AuthToken): HttpRequest<unknown> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token.token}` },
  });
}

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authManagerService = inject(AuthManagerService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      const isUnauthorized = error instanceof HttpErrorResponse && error.status === 401;

      if (!isUnauthorized || isAuthRouteExceptLogout(req.url)) {
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshedTokenSubject.pipe(
          filter((token): token is AuthToken => token !== null),
          take(1),
          switchMap((token) => next(cloneWithToken(req, token)))
        );
      }

      isRefreshing = true;
      refreshedTokenSubject.next(null);

      return authService.refresh().pipe(
        switchMap((token: AuthToken) => {
          isRefreshing = false;
          authManagerService.markUserAsAuthenticated(token);
          refreshedTokenSubject.next(token);
          return next(cloneWithToken(req, token));
        }),
        catchError((refreshError: unknown) => {
          isRefreshing = false;
          refreshedTokenSubject.next(null);
          authManagerService.markUserAsUnauthenticated();
          router.navigate([AppRoutes.Login]);
          return throwError(() => refreshError);
        })
      );
    })
  );
}