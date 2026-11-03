import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authicatedRequest = req.clone({withCredentials: true});

  return next(authicatedRequest);
};
