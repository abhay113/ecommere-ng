import { EventEmitter, Injectable } from '@angular/core';
import { signUp } from '../data/sign-up';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login } from '../data/log-in';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router) {}

  userSignUp(data: signUp) {
    return this.httpClient
      .post(`http://localhost:3000/users`, data, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/home']);
        }
      });
  }

  userLogin(data: login) {
    this.httpClient
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
