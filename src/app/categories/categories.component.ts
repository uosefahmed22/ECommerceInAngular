import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  
  constructor(private _CategoriesService: CategoryService) {
    localStorage.setItem('currentPage', '/categories');
   }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log('Categories:', this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
}
