import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../+shared/services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../+shared/services/categories.service';
import {OrdersService} from '../../+shared/services/orders.service';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './list-orders.component.html',
    styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

    page = 1;
    orders = [];
    meta = {};

    loading: Subscription;
    orderType = '';
    order = '';
    isOpenCalendar = false;

    hoveredDate: NgbDate;

    fromDate: NgbDate;
    toDate: NgbDate;

    priceRange = [];
    minPrice;
    maxPrice;

    constructor(private ordersService: OrdersService,
                private route: ActivatedRoute,
                private router: Router,
                private calendar: NgbCalendar) {
    }

    ngOnInit() {
        this.order = 'desc';
        this.orderType = 'newest';

        this.route.params.subscribe((params: any) => {
            this.page = params.page || 1;

            this.load();
        });
    }

    load(page = this.page) {
        if (this.loading) {
            this.loading.unsubscribe();
        }

        let beginDate;
        let endDate;

        this.page = page;

        this.orders = [];

        if (this.fromDate && this.toDate) {
            beginDate = new Date(`${this.fromDate.month}.${this.fromDate.day}.${this.fromDate.year}`).getTime() / 1000;
            endDate = new Date(`${this.toDate.month}.${this.toDate.day}.${this.toDate.year}`).getTime() / 1000;
        }

        this.loading = this.ordersService.getList({
            beginDate,
            endDate,
            minPrice: this.priceRange[0],
            maxPrice: this.priceRange[1],
            page: this.page,
            orderType: this.orderType,
            order: this.order
        }).subscribe((rez) => {
            this.orders = rez.result;
            this.meta = rez.meta;

            if (!this.priceRange.length) {
                this.minPrice = 0;
                this.maxPrice = +rez.max_price;

                this.priceRange.push(0, +rez.max_price);
            }

            this.loading = null;
        });
    }

    changePage(page) {
        this.router.navigate(['/backend/orders/list/', page]);
    }

    remove(id) {
        this.ordersService.removeOrder(id).subscribe(() => {
            if (this.orders.length === 1) {
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
            this.router.navigate(['backend/products/list/1']);
        } else {
            this.load();
        }
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }

        this.refresh();
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    toggleCalendar() {
        this.isOpenCalendar = !this.isOpenCalendar;

        if (!this.isOpenCalendar && (this.fromDate || this.toDate)) {
            this.fromDate = null;
            this.toDate = null;

            this.refresh();
        }
    }

}
