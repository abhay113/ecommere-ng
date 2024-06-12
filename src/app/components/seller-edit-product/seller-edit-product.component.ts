import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../data/product';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrl: './seller-edit-product.component.scss',
})
export class SellerEditProductComponent {
  productId = this.route.snapshot.paramMap.get('id');
  productData: undefined | product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.productId &&
      this.productService.getProductById(this.productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
  }
}
