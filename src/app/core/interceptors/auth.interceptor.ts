import { HttpInterceptorFn } from "@angular/common/http"
import { TokenStorageService } from "../services/token-storage.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorageService = inject(TokenStorageService);
  const tokenDto = tokenStorageService.getAccessToken();

  if (!tokenDto) {
    return next(req);
  }

  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenDto?.token}`
    }
  });

  return next(newRequest)
}