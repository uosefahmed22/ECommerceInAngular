import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { PayComponent } from './pay/pay.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { authGuard } from './auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { BranddetailsComponent } from './branddetails/branddetails.component';
import { CategoerydetailsComponent } from './categoerydetails/categoerydetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'navbar', component: NavbarComponent },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'favorites', component: FavoriteComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },
  { path: 'Orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'pay/:id', component: PayComponent, canActivate: [authGuard] },
  { path: 'productdetails/:id', component: ProductdetailsComponent, canActivate: [authGuard] },
  { path: 'categorydetails/:id', component: CategoerydetailsComponent, canActivate: [authGuard] },
  { path: 'brandsdetails/:id', component: BranddetailsComponent, canActivate: [authGuard] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }