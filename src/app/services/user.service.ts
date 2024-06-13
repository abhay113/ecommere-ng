import { Injectable } from '@angular/core';
import { signUp } from '../data/sign-up';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
}
