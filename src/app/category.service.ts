import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://shopapp.runasp.net/api/Category';
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/getcategories`);
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/getcategory?categoryId=${categoryId}`);
  }
}