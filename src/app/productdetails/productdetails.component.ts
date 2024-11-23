import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  //value of event target=>
  ProdId: number = 0;
  oneproduct!: Product;
  errmessage: string = '';
  selectedImage: string = '';

  customOptions: OwlOptions = {
    loop: true, // Enable looping for infinite scrolling
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true, // Show navigation dots
    nav: true, // Enable navigation arrows
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    navSpeed: 700,
    items: 1, // Only one image visible at a time
  };

  constructor(private _ActivatedRoute: ActivatedRoute
    , private _ToastEvokeService: ToastEvokeService, private _ProductService: ProductService, private _CartService: CartService) {
    localStorage.setItem('currentPage', '/productdetails');
  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params) => {
      this.ProdId = +params['id'];
      this.fetchProductDetails(this.ProdId);
    });
  }
  
  rateProduct(productId: number, ratingValue: number) {
    this._ProductService.rateproduct(productId, ratingValue).subscribe({
      next: (res) => {
        console.log('Product rated:', res);
        this._ToastEvokeService.success('message', res.message);
      },
      error: (err) => {
        console.error('Error rating product:', err);
        this._ToastEvokeService.warning('message', err.error.message);
      }
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

  fetchProductDetails(productId: number): void {
    this._ProductService.getProductById(productId).subscribe({
      next: (data) => {
        this.oneproduct = data.data;
        if (this.oneproduct.productImagesUrls && this.oneproduct.productImagesUrls.length > 0) {
          this.selectedImage = this.oneproduct.productImagesUrls[0];
        } else {
          this.selectedImage = this.oneproduct.imageCoverUrl;
        }
      },
      error: (err) => {
        this.errmessage = 'Product not found';
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
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
} 