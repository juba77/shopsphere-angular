import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleEnum } from 'src/api-client';
import { AuthService } from './auth.service';

/*
 * This function control the access to a path
 * by checking wether user is connected or not
 * and redirect to home if not
 */
export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticatedUser()) return true;
  router.navigate(['home']);
  return false;
};

/*
 * This function control the access for the admin
 */
export const canActivateOnlyForBuyer: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if (user.role === RoleEnum.Buyer) return true;
  router.navigate(['home']);
  return false;
};
