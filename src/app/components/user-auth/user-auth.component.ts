import { Component } from '@angular/core';
import { signUp } from '../../data/sign-up';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { login } from '../../data/log-in';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent {
  signUpMessage: string | undefined = '';
  showLogin: boolean = false;
  authError: string = '';
  constructor(private userService: UserService, private router: Router) {}
  signUp(data: signUp) {
    this.userService.userSignUp(data);
  }

  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'User Not Found !!';
      }
    });
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
