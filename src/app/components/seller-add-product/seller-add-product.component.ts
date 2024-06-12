import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data/product';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private productService: ProductService) {}
  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product added Successfully !!';
      }
    });
  }
}
