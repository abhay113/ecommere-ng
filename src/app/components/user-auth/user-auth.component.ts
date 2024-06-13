import { Component } from '@angular/core';
import { signUp } from '../../data/sign-up';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent {
  signUp(data: signUp) {
    console.warn(data);
  }
}
