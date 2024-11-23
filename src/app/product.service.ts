import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = 'https://localhost:7073/api/Product';
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  getBestSellingProducts(): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/getbestsellingproducts`);
  }

  getNewProducts(): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/getnewproducts`);
  }
  
  getProducts(pageIndex: number, pageSize: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/getproducts`, {
      params: {
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getProductById(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/getproduct?id=${id}`);
  }

  rateproduct(productId: number, ratingValue: number): Observable<any> {
    return this._HttpClient.post<any>(`${this.baseUrl}/rateproduct?productId=${productId}&ratingValue=${ratingValue}`, null);
  }
}