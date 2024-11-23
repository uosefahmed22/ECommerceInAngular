import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { FavoriteService } from '../favorite.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageIndex: number = 1;
  pageSize: number = 12;
  totalPages: number = 1;
  products: Product[] = [];
  currentproductId: number = 0;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  constructor(private _ProductsService: ProductService
    , private _CartService: CartService
    , private _ToastEvokeService: ToastEvokeService
    , private _FavoriteService: FavoriteService
    , private router: Router) {
    localStorage.setItem('currentPage', '/products');
  }
  ngOnInit() {
    this.getProducts();
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

  onPreviousPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getProducts();
    }
  }

  onNextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getProducts();
    }
  }

  onPageClick(page: number) {
    this.pageIndex = page;
    this.getProducts();
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  getProducts() {
    this._ProductsService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.data;
        const metadata = res.metadata;
        this.pageIndex = metadata.currentPage;
        this.totalPages = metadata.numberOfPages;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
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