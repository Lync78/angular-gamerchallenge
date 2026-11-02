import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(Auth);
    const router = inject(Router);

      return authService.checkAuthentication().pipe(map(() => true), catchError(() => of(router.createUrlTree(['/login'])))
  );
};
