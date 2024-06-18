import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  addProduct(data: product) {
    return this.httpClient.post(`http://localhost:3000/products`, data);
  }
  showProducts() {
    return this.httpClient.get<product[]>(`http://localhost:3000/products`);
  }
  deleteProductById(id: string) {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }
  getProductById(id: string) {
    return this.httpClient.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: product) {
    return this.httpClient.put<product>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }
  populateProducts() {
    return this.httpClient.get<product[]>(
      'http://localhost:3000/products?_limit=3'
    );
  }
  populateTrendyProducts() {
    return this.httpClient.get<product[]>(
      'http://localhost:3000/products?_limit=8'
    );
  }
  searchProducts(q: string) {
    return this.httpClient.get<product[]>(
      `http://localhost:3000/products?q=${q}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
  }
}
