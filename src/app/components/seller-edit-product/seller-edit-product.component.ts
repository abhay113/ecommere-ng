import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../../data/product';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrl: './seller-edit-product.component.scss',
})
export class SellerEditProductComponent {
  productId = this.route.snapshot.paramMap.get('id');
  productData: undefined | product;
  productMessage: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productId &&
      this.productService.getProductById(this.productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Updated data Successfully !!';
        setTimeout(() => {
          this.router.navigate(['seller-home']);
        }, 2000);
      }
    });
  }
}
