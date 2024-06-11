import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { signUp } from '../../data/sign-up';
import { Router } from '@angular/router';
import { login } from '../../data/log-in';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss',
})
export class SellerComponent {
  sellerLogIn: boolean = true;
  signUp(data: signUp): void {
    this.sellerService.sellerSignUp(data);
  }

  logIn(data: login): void {
    this.sellerService.sellerLogin(data);
  }

  showLogin() {
    this.sellerLogIn = true;
  }
  showSignUp() {
    this.sellerLogIn = false;
  }

  constructor(private sellerService: SellerService) {
    sellerService.reloadSeller();
  }
}
