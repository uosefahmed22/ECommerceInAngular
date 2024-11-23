import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = 'https://localhost:7073/api/Checkout';
  constructor(private _HttpCient: HttpClient) { }

  checkoutOrder(cartId: string, addressform: any): Observable<any> {
    return this._HttpCient.post(`${this.baseUrl}/createcheckout?cartId=${cartId}`, addressform);
  }

  getOrders(): Observable<any> {
    return this._HttpCient.get(`${this.baseUrl}/getallcheckouts`);
  }
}
