import { Component } from '@angular/core';
import { signUp } from '../../data/sign-up';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { login } from '../../data/log-in';
import { product } from '../../data/product';
import { cart } from '../../data/cart';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent {
  signUpMessage: string | undefined = '';
  showLogin: boolean = false;
  authError: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService
  ) {}
  signUp(data: signUp) {
    this.userService.userSignUp(data);
    this.localCartToRmoteCart();
  }

  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'User Not Found !!';
      }
    });

    this.localCartToRmoteCart();
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  localCartToRmoteCart() {
    let data = localStorage.getItem('localCart');

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartList: product[] = JSON.parse(data);
      cartList.forEach((item, index) => {
        let cartData: cart = {
          ...item,
          productId: item.id,
          userId: userId,
        };
        delete cartData.id;

        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('added to db !!');
            }
          });
        }, 1000);

        if (cartList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 1000);
  }
}
