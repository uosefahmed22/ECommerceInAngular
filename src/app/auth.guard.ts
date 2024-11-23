import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router: Router = inject(Router);
  let _AuthService: AuthService = inject(AuthService);

  const token = localStorage.getItem('token');
  if (!token) {
    _Router.navigate(['/login']);
    return false;
  }
  else {
    _AuthService.SaveDataMethod();
    return true;
  }
};