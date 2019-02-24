import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../+shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../+shared/services/categories.service';
import {PromotionsService} from '../../+shared/services/promotions.service';

@Component({
    templateUrl: './list-promotions.component.html',
    styleUrls: ['./list-promotions.component.scss']
})
export class ListPromotionsComponent implements OnInit {

    page = 1;
    promotions = [];
    meta = {};

    orderType = 'productsCount';
    order = 'desc';

    constructor(private promotionsService: PromotionsService,
                private categoriesService: CategoriesService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.page = params.page || 1;

            this.load();
        });
    }

    load(page = this.page) {
        this.page = page;

        this.promotions = [];
        this.promotionsService.getList({
            page: this.page,
            orderType: this.orderType,
            order: this.order,
        }).subscribe((rez) => {
            console.log(rez);

            this.promotions = rez.result;
            this.meta = rez.meta;
        });
    }

    changePage(page) {
        this.router.navigate(['/backend/promotions/list/', page]);
    }

    remove(id) {
        this.promotionsService.removePromotion(id).subscribe(() => {
            if (this.promotions.length === 1) {
                this.load(this.page - 1);
            } else {
                this.load();
            }
        });
    }

    changeFilter(type) {
        if (this.orderType !== type) {
            this.orderType = type;
            this.order = 'desc';
        } else {
            this.order = this.order === 'asc' ? 'desc' : 'asc';
        }

        this.refresh();
    }

    refresh() {
        if (+this.page !== 1) {
            this.router.navigate(['backend/promotions/list/1']);
        } else {
            this.load();
        }
    }

}
