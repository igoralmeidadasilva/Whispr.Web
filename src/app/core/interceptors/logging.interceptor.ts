import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.info(`[HTTP] Before request → ${req.method} ${req.url}`);

  return next(req).pipe(
    tap(() => {
      console.info(`[HTTP] After request → ${req.method} ${req.url}`);
    }),
    catchError((error) => {
      console.error(`[HTTP] Request failed → ${req.method} ${req.url}`, error);
      return throwError(() => error);
    })
  );
}