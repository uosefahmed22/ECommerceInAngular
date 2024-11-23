import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pageIndex: number = 1;
  pageSize: number = 20;
  products: Product[] = [];

  customOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    dots: false,
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      576: {
        items: 2,
        margin: 15
      },
      768: {
        items: 3,
        margin: 20
      },
      992: {
        items: 3,
        margin: 20
      }
    },
    nav: true
  };


  constructor(private _ProductsService: ProductService
    , private _CartService: CartService
    , private _ToastEvokeService: ToastEvokeService
    , private _FavoriteService: FavoriteService
    , private _Router: Router) {
    localStorage.setItem("currentPage", "/home");
  }

  ngOnInit() {
    this.getProducts();
    this.getBestSellingProducts();
    this.getNewProducts();
  }

  getProducts() {
    this._ProductsService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.data;
        console.log('Products:', this.products);
        console.log('category name', this.products[9].categoryDto.name);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(hasHalfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  getBestSellingProducts() {
    this._ProductsService.getBestSellingProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching best-selling products:', err);
      }
    });
  }

  getNewProducts() {
    this._ProductsService.getNewProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching new products:', err);
      }
    });
  }

  addtocart(productId: number) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        this._ToastEvokeService.success('message', res.message);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._ToastEvokeService.warning('message', err.error.message);
      }
    });
  }

  addToFavorites(productId: number) {
    this._FavoriteService.addToFavorite(productId).subscribe({
      next: (res) => {
        console.log('Product added to favorites:', res);
        this._ToastEvokeService.success('message', res.message);
      },
      error: (err) => {
        this._ToastEvokeService.warning('message', err.error.message);
        console.error('Error adding product to favorites:', err);
      }
    });
  }
}