import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data/product';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  menuType: String = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  query: undefined | string;
  username: string = '';
  cartItems = 0;
  constructor(private route: Router, private productService: ProductService) {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.username = userData.name;
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    alert('logout seller ?');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  getSearchQueary(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(q: string) {
    this.route.navigate([`search/${q}`]);
    this.query = '';
  }
  redirectToDetails(id: string) {
    this.route.navigate([`/details/${id}`]);
    this.query = '';
  }
}
