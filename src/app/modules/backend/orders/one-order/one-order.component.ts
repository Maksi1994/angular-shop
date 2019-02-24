import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../../+shared/services/orders.service';
import * as _ from 'lodash';

@Component({
    templateUrl: './one-order.component.html',
    styleUrls: ['./one-order.component.scss']
})
export class OneOrderComponent implements OnInit {

    order;
    wasSubmitted = false;
    editObj: any = {
        counts: {}
    };

    constructor(private route: ActivatedRoute,
                private router: Router,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.load(params.id);
        });
    }

    load(id) {
        this.ordersService.getOne(id).subscribe((response) => {
            this.order = response.result;

            this.order.products.forEach(productGroup => {
                this.editObj.counts[String(productGroup.id)] = productGroup.count;
            });

            console.log(response);
        });
    }

    updateOrder() {
        const data = {
            producta: this.order.products.map((product) => {
                return {
                    product_id: product.id,
                    count: this.editObj.counts[String(product.id)]
                };
            }),
            order_id: this.order.id
        };

        this.wasSubmitted = true;

        this.ordersService.updateOrder(data).subscribe((rez) => {
            if (rez.success) {
                this.load(this.order.id);
            }
        });
    }

    removeOrder() {
        this.ordersService.removeOrder(this.order.order_id).subscribe((rez) => {
            if (rez.success) {
                this.backToList();
            }
        });
    }

    removeProduct(index) {
        _.remove(this.order.products, (product, i) => {
            return i === +index;
        });

        if (!this.order.products.length) {
            this.backToList();
        }
    }

    backToList() {
        this.router.navigate(['backend/orders/list']);
    }
}
