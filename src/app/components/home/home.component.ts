import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  topProduct: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private productService: ProductService) {
    this.getTopProducts();
    this.getTrendyProducts();

  }
  getTopProducts() {
    this.productService.populateProducts().subscribe((result) => {
      this.topProduct = result;
    });
  }
  getTrendyProducts() {
    this.productService.populateTrendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    });
  }
}
