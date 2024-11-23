import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://localhost:7073/api/Auth';
  Userdata: BehaviorSubject<any> = new BehaviorSubject(null);
  redirectUrl: string = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      this.redirectUrl = storedPage;
    }
  }

  ngOnInit(): void {
    this.SaveDataMethod();
  }

  registerApi(RegData: Auth): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/register`, RegData);
  }

  
  forgetPasswordApi(email: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/forgot-password?email=${email}`, {});
  }
  
  verifyOtpApi(VerifyData: Auth): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/verify-otp`, VerifyData);
  }

  resetPasswordApi(ResetData: Auth): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/reset-password`, ResetData);
  }
  
  loginApi(LogData: Auth): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/login`, LogData);
  }
  
  SaveDataMethod(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = this.decodeToken(token);
      this.Userdata.next(userData);
    } else {
      this.Userdata.next(null);
    }
  }

  decodeToken(token: string): any {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }
}
