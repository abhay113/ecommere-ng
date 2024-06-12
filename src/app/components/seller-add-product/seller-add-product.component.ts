import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data/product';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private productService: ProductService, private router: Router) {}
  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product added Successfully !!';
        setTimeout(() => {
          this.router.navigate(['seller-home']);
        }, 2000);
      }
    });
  }
}
