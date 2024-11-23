import { Component } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  favoriteItems: any[] = [];
  numOfFavoriteItems: number = 0;

  constructor(
    private _FavoriteService: FavoriteService,
    private _router: Router
  ) {
    localStorage.setItem('currentPage', '/favorite');
  }

  ngOnInit(): void {
    this.refreshFavoriteData();
  }

  removeFavoriteItem(productId: number) {
    this._FavoriteService.removeItemfromFavorite(productId).subscribe({
      next: () => {
        const itemIndex = this.favoriteItems.findIndex((item: any) => item.productId === productId);
        if (itemIndex > -1) {
          this.favoriteItems.splice(itemIndex, 1);
          this.refreshFavoriteData();
        }
        console.log('Item removed from favorites');
      },
      error: (err) => {
        this.errorHandler(err, 'removing item from favorites');
      },
    });
  }

  refreshFavoriteData(): void {
    this._FavoriteService.getFavoriteItems().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.favoriteItems = res.data || [];
        this.numOfFavoriteItems = this.favoriteItems.length;
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
