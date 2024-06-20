import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data/product';
import { cart } from '../data/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[]>();
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
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(id: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      if (items) {
        items = items.filter((item: product) => id !== item.id);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items);
      }
    }
  }
  addToCart(cartData: cart) {
    return this.httpClient.post(`http://localhost:3000/cart`, cartData);
  }

  getCartList(userId: string) {
    this.httpClient
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
}
