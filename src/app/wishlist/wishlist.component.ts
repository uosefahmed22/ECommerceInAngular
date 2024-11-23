import { Component } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  favoriteItems: any[] = [];
  totalWishlistItems: number = 0;

  constructor(
    private _FavoriteService: FavoriteService,
    private _router: Router
  ) {
    localStorage.setItem('currentPage', '/wishlist');
  }

  ngOnInit(): void {
    this.refreshFavoriteData();
  }

  removewishlistItem(productId: number) {
    this._FavoriteService.removeItemfromWishlist(productId).subscribe({
      next: () => {
        const itemIndex = this.favoriteItems.findIndex((item: any) => item.productId === productId);
        if (itemIndex > -1) {
          this.favoriteItems.splice(itemIndex, 1);
          this.refreshFavoriteData();
        }
        console.log('Item removed from wishlist');
      },
      error: (err) => {
        this.errorHandler(err, 'removing item from wishlist');
      },
    });
  }

  refreshFavoriteData(): void {
    this._FavoriteService.getWishlistItems().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.favoriteItems = res.data || [];
        this.totalWishlistItems = this.favoriteItems.length;
      }
    });
  }

  navigateToProduct(productId: number) {
    this._router.navigate(['/productdetails', productId]);
  }

  navigateToProducts() {
    this._router.navigate(['/products']);
  }

  errorHandler(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
    alert(`Failed to ${action}. Please try again later.`);
  }
}
