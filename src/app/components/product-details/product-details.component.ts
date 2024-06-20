import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../data/product';
import { ProductService } from '../../services/product.service';
import { cart } from '../../data/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  productData: undefined | product;
  quantity: number = 1;
  removeCart: boolean = false;
  cartMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.loadData();
  }

  loadData() {
    let id = this.route.snapshot.paramMap.get('id');
    id &&
      this.productService.getProductById(id).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (id && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => id == item.id.toString());
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
  }
  handleQuantity(query: string) {
    if (query === 'min' && this.quantity > 1) {
      this.quantity--;
    } else if (query === 'plus' && this.quantity < 10) {
      this.quantity++;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.quantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId: userId,
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.cartMessage = 'Added to Cart !';
          }
        });
      }
    }
  }

  removeFromCart(id: string) {
    this.productService.removeItemFromCart(id);
    this.removeCart = false;
  }
}
