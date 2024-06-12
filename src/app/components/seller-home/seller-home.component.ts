import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data/product';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss',
})
export class SellerHomeComponent {
  productList: undefined | product[];
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private productService: ProductService) {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.showProducts().subscribe((result) => {
      if (result) {
        this.productList = result;
        console.warn(this.productList);
      }
    });
  }
  deleteProduct(id: string) {
    this.productService.deleteProductById(id).subscribe((result) => {
      if (result) {
        console.log(id);
        alert('deleted product successfully !!');
        this.listProducts();
      } else {
        alert('something went wrong !!');
      }
    });
  }

}
