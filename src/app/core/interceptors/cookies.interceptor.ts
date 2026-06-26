import { HttpInterceptorFn } from "@angular/common/http";

export const cookiesInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req.clone({ withCredentials: true }));
}