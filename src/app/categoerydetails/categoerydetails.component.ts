import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../product';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-categoerydetails',
  templateUrl: './categoerydetails.component.html',
  styleUrls: ['./categoerydetails.component.css']
})
export class CategoerydetailsComponent implements OnInit {
  category: Category | null = null;
  products: Category['products'] = [];
  selectedImage: string = '';
  oneProduct: any = null;
  errMessage: string = '';

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
    private categoryService: CategoryService,
    private cartService: CartService,
    private _FavoriteService: FavoriteService,
    private _ToastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategory(categoryId);
  }

  getCategory(categoryId: number = 0): void {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (res) => {
        this.category = res.data;
        if (this.category) {
          this.products = this.category.products;
        }
      },
      error: (err) => {
        console.error('Error fetching category:', err);
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