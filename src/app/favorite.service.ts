import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseUrl: string = 'https://localhost:7073/api/FavoriteWishlist';
  constructor(private _HttpClient: HttpClient) { }

  getFavoriteItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/get-favorites`);
  }

  addToFavorite(productId: number): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/add-favorite?productId=${productId}`,
      {}
    );
  }

  removeItemfromFavorite(productId: number): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/remove-favorite?productId=${productId}`
    );
  }

  //wishlist
  getWishlistItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/get-wishlist`);
  }

  addToWishlist(productId: number): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/add-wishlist-item?productId=${productId}`,
      {}
    );
  }

  removeItemfromWishlist(productId: number): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/remove-wishlist-item?productId=${productId}`
    );
  }
}