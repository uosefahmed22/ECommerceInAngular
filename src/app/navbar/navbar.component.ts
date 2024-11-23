import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  islogin: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router, private _Cartservice: CartService) { }
  cartItemNav!: number;
  ngOnInit(): void {
    this._AuthService.SaveDataMethod();

    this._AuthService.Userdata.subscribe((data) => {
      this.islogin = !data;
    });

    this._AuthService.Userdata.subscribe((data) => {
      if (data != null) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    });
  }
  removecartItemCount() {
    this._Cartservice.updateCartItemCount(0);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('currentPage');
    this._Cartservice.updateCartItemCount(0);
    this._AuthService.SaveDataMethod();
    this._Router.navigate(['/login']);
    this.islogin = false;
  }
}