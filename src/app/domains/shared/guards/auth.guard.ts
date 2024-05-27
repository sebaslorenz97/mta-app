import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

import { TokenService } from '../../shared/services/token.service'

export const authGuard: CanActivateFn = (route, state) => {
  const token: string | undefined = inject(TokenService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
  }
  return true;
};
