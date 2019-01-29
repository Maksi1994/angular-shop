import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../+shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../+shared/services/categories.service';

@Component({
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

    page = 1;
    products = [];
    meta = {};
    maxPrice;
    minPrice;

    loading: Subscription;
    order = 'desc';
    categoryId;
    categories = [];
    priceRange = [];

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.load(params.page);
        });

        this.loadCategories();
    }

    load(page = this.page) {
        if (this.loading) {
            this.loading.unsubscribe();
        }

        this.page = page;

        this.products = [];
        this.loading = this.productsService.getList({
            page: this.page,
            minPrice: 0,
            maxPrice: 100,
            order: this.order,
            categoryId: this.categoryId
        }).subscribe((rez) => {
            this.products = rez.result;
            this.meta = rez.meta;
            this.maxPrice = rez.max_price;
            this.minPrice = rez.min_price;
            this.priceRange.push(rez.min_price, rez.max_price);

            this.loading = null;
        });
    }

    loadCategories() {
        this.categoriesService.getAll().subscribe(rez => {
            this.categories = rez.result;
        });
    }

    changePage(page) {
        this.router.navigate(['/backend/products/list/', page]);
    }

    remove(id) {
        this.productsService.removeProduct(id).subscribe(() => {
            if (this.products.length === 1) {
                this.load(this.page - 1);
            } else {
                this.load();
            }
        });
    }

}
