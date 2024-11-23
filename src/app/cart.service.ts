import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartitemnumbers: BehaviorSubject<number>;
  usertoken: any = localStorage.getItem('token');
  baseUrl: string = 'http://shopapp.runasp.net/api/ShoppingCart';

  constructor(private _HttpClient: HttpClient) {
    const storedCount = localStorage.getItem('cartItemCount');
    this.cartitemnumbers = new BehaviorSubject<number>(storedCount ? +storedCount : 0);
  }
  
  getCartItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/getcartitems`, {
      headers: { Authorization: `Bearer ${this.usertoken}` },
    });
  }
  
  updateCartItemCount(count: number) {
    this.cartitemnumbers.next(count);
    localStorage.setItem('cartItemCount', count.toString());
  }


  addToCart(productId: number): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/addtocart?productId=${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${this.usertoken}` }
      }
    );
  }

  updateCartItem(productId: number, quantity: number): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/updatecartitem?productId=${productId}&quantity=${quantity}`,
      {},
      { headers: { Authorization: `Bearer ${this.usertoken}` } }
    );
  }


  removeItemfromCart(productId: number): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/removeitemfromcart?productId=${productId}`, {
      headers: { Authorization: `Bearer ${this.usertoken}` }
    }
    ).pipe(
      tap(() => {
        this.updateCartItemCount(this.cartitemnumbers.value - 1);
        window.location.reload();
      })
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/clearcart`, {
      headers: { Authorization: `Bearer ${this.usertoken}` }
    });
  }
}
