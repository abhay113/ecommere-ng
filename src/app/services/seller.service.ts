import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from '../data/sign-up';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login } from '../data/log-in';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  sellerSignUp(data: signUp) {
    return this.httpClient
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
      });
  }

  sellerLogin(data: login) {
    console.log(data);
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
