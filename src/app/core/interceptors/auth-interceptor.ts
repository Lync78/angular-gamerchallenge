import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authticatedRequest = req.clone({withCredentials: true});

  return next(authticatedRequest);
};
