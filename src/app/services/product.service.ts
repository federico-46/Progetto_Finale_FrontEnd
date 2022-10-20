import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../secure/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private ApiUrl = 'http://127.0.0.1:8000';

  private _url = this.ApiUrl + '/products';
  private cart_url = this.ApiUrl + '/cart';

  constructor(private http: HttpClient) {}

  list(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._url);
  }

  add(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this._url, product);
  }

  update(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this._url}/${product.id}`, product);
  }

  delete(product: IProduct): Observable<boolean> {
    return this.http.delete<boolean>(`${this._url}/${product.id}`);
  }

  // -------------------------------- Cart ------------------------------------------------

  cartList() {
    return this.http.get(this.cart_url);
  }

  addCartItem(product: any) {
    return this.http.post(this.cart_url, product);
  }

  updateCartItem(itemId: any, cartItem: any) {
    return this.http.put(this.cart_url + '/' + itemId, cartItem);
  }

  deleteCartItem(itemId: any) {
    return this.http.delete(this.cart_url + '/' + itemId);
  }
}
