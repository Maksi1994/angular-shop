import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../+shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../+shared/services/categories.service';

@Component({
    templateUrl: './list-categories.component.html',
    styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

    categories = [];

    loading: Subscription;
    order = 'desc';
    byCountOfUsers = false;
    byTimestamp = false;
    parentId;

    constructor(private categoriesService: CategoriesService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.load();
    }

    load() {
        if (this.loading) {
            this.loading.unsubscribe();
        }

        this.categories = [];
        this.loading = this.categoriesService.getAll({
            byCountOfUsers: this.byCountOfUsers,
            byTimestamp: this.byTimestamp,
            order: this.order,
            parentId: this.parentId
        }).subscribe((rez) => {
            this.categories = rez.result;
            this.loading = null;
        });
    }

    changePage(page) {
        this.router.navigate(['/backend/products/list/', page]);
    }

    remove(id) {
        this.categoriesService.removeOne(id).subscribe(() => {
            this.load();
        });
    }

}
