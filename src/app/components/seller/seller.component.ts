import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { signUp } from '../../data/sign-up';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss',
})
export class SellerComponent {
  signUp(data: signUp): void {
    this.sellerService.userSignUp(data);
  }

  constructor(private sellerService: SellerService) {
    sellerService.reloadSeller();
  }
}
