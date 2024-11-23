import { Component } from '@angular/core';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  Brands: Brand[] = [];

  constructor(private _BrandsService: BrandService) {
    localStorage.setItem('currentPage', '/brands');
   }
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.Brands = res.data;
        console.log('Brands:', this.Brands);
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      },
    });
  }
}