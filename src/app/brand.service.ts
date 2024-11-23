import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl: string = 'https://localhost:7073/api/Brand';
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  getBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/getbrands`);
  }

  getBrandById(brandId: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/getbrand?brandId=${brandId}`);
  }
}