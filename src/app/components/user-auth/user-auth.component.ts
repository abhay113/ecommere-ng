import { Component } from '@angular/core';
import { signUp } from '../../data/sign-up';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent {
  signUpMessage: string | undefined = '';

  constructor(private userService: UserService, private router: Router) {}
  signUp(data: signUp) {
    this.userService.userSignUp(data);
  }
}
