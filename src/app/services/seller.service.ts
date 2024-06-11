import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from '../data/sign-up';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private httpClient: HttpClient) {}

  userSignUp(data: signUp) {
    return this.httpClient.post('http://localhost:3000/seller', data);
  }
}
