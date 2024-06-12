import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
})
export class SellerAddProductComponent {
  submit(data: object) {
    console.log(data);
  }
}
