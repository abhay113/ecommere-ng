import { Component } from '@angular/core';
import { product } from '../../data/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  productData: undefined | product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    let query = this.route.snapshot.paramMap.get('query');
    query &&
      this.productService.searchProducts(query).subscribe((result) => {
        console.log(result);
        this.productData = result;
      });
  }
}
