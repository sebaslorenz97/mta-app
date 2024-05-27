import { CanActivateFn, Router} from '@angular/router';

import { inject } from '@angular/core';

import { TokenService } from '../../shared/services/token.service'

export const redirectGuard: CanActivateFn = (route, state) => {
  const token: string | undefined = inject(TokenService).getToken();
  if (token) {
    inject(Router).navigate(['/dashboard-users']);
    return false;
  }
  return true;
};
