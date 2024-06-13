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
        console.log(result);
      });
  }
  handleQuantity(query: string) {
    if (query === 'min' && this.quantity > 1) {
      this.quantity--;
    } else if (query === 'plus' && this.quantity < 10) {
      this.quantity++;
    }
  }
}
