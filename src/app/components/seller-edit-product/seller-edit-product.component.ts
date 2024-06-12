import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrl: './seller-edit-product.component.scss',
})
export class SellerEditProductComponent {
  constructor(private productService: ProductService) {}

  updateProduct() {}
}
