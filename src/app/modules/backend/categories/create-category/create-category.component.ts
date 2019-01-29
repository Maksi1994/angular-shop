import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../+shared/services/products.service';
import {CategoriesService} from '../../+shared/services/categories.service';

@Component({
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

      wasSubmitted = false;
      allCategories = [];
      parentId = 0;
      category: any = {};
      loading: boolean = false;

      constructor(private route: ActivatedRoute,
                  private router: Router,
                  private productsService: ProductsService,
                  private categoriesService: CategoriesService) {

      }

      ngOnInit() {
        this.loading = true;

        this.categoriesService.getAll().subscribe(({result}) => {
              this.allCategories = result;
              this.loading = false;
          });
      }

      saveCategory() {
          this.wasSubmitted = true;

          if (this.category.name) {
             this.category.parentId  = this.parentId;

              this.categoriesService.createCategory(this.category).subscribe((responce) => {
                  if (responce.result.success) {
                      this.router.navigate(['/backend/categories/edit/', responce.result.id]);
                  }
              });
          }
      }
}
