import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../data/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  productData: undefined | product;
  quantity: number = 1;
  removeCart: boolean = false;
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
      }
    }
  }

  removeFromCart(id: string) {
    this.productService.removeItemFromCart(id);
    this.removeCart = false;
  }
}
