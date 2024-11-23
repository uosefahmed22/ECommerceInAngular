import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { BrandService } from '../brand.service';
import { CartService } from '../cart.service';
import { FavoriteService } from '../favorite.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-branddetails',
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.css']
})
export class BranddetailsComponent implements OnInit {
  brand: Brand | null = null;
  products: Brand['products'] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    navSpeed: 700,
    items: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService,
    private cartService: CartService,
    private _FavoriteService: FavoriteService,
    private _ToastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    const brandId = Number(this.route.snapshot.paramMap.get('id'));
    this.getbrand(brandId);
  }

  getbrand(brandId: number = 0): void {
    this.brandService.getBrandById(brandId).subscribe({
      next: (res) => {
        this.brand = res.data;
        this.products = res.data.products;
      },
      error: (err) => {
        console.error('Error getting brand:', err);
      },
    });
  }

  getStars(rating: number): string[] {
    if (rating < 0 || rating > 5) {
      console.error(`Invalid rating value: ${rating}. It must be between 0 and 5.`);
      return [];
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(hasHalfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this._ToastEvokeService.success('Success', res.message);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._ToastEvokeService.warning('Error', err.error.message);
      },
    });
  }

  addToFavorites(productId: number) {
    this._FavoriteService.addToFavorite(productId).subscribe({
      next: (res) => {
        this._ToastEvokeService.success('message', res.message);
      },
      error: (err) => {
        console.error('Error adding product to favorites:', err);
      }
    });
  }
}