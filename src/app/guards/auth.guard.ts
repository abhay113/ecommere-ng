import { CanActivateFn } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { inject } from '@angular/core';

export class authGuardClass {
  constructor(private sellerService: SellerService) {}
}
export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);

  if (localStorage.getItem('seller')) {
    return true;
  }
  return sellerService.isSellerLoggedIn;
};
