import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../+shared/services/products.service';
import {CategoriesService} from '../../+shared/services/categories.service';
import {zip} from 'rxjs';

@Component({
    templateUrl: './one-category.component.html',
    styleUrls: ['./one-category.component.scss']
})
export class OneCategoryComponent implements OnInit {

    wasSubmitted = false;
    allCategories = [];
    parentId;
    category;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productsService: ProductsService,
                private categoriesService: CategoriesService) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.load(params.id);
        });
    }

    load(id) {
        zip(this.categoriesService.getOne(id),
            this.categoriesService.getAll()
        ).subscribe((rezults: any[]) => {
            this.category = rezults[0].result;
            this.allCategories = rezults[1].result.filter(category => category.id !== this.category.id);

            this.parentId = this.category.parent ? this.category.parent.id : 0;
        });
    }

    updateProduct() {
        this.wasSubmitted = true;

        if (this.category.name) {
            this.category.parentId = this.parentId;

            this.categoriesService.updateCategory(this.category).subscribe(() => {
                this.load(this.category.id);
            });
        }
    }
}


