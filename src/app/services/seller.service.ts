import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
  isLoginError = new EventEmitter<boolean>(false);
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
    this.httpClient
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.isLoginError.emit(false);
          this.router.navigate(['seller-home']);
        } else {
          console.log('login failed');
          this.isLoginError.emit(true);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
