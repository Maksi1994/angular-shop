import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../+shared/services/products.service';
import {zip} from 'rxjs';
import {CategoriesService} from '../../+shared/services/categories.service';

@Component({
    templateUrl: './one-product.component.html',
    styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent implements OnInit {

    product: any = {};
    categories = [];
    wasSubmitted = false;
    productImageUrl;

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
        zip(
            this.productsService.getOne(id),
            this.categoriesService.getAll()
        ).subscribe((rez: any[]) => {
            this.product = rez[0].result;
            this.categories = rez[1].result;

            this.productImageUrl = this.product.image;
            delete this.product.image;
        });
    }

    uploadFile(e: any) {
        const reader = new FileReader();

        this.product.image = e.target.files[0];

        reader.readAsDataURL(this.product.image);
        reader.onload = () => {
          this.productImageUrl = reader.result;
        };
    }

    updateProduct() {
        this.wasSubmitted = true;

        if (this.product.name &&
            this.product.price &&
            this.product.category_id) {

            this.productsService.updateProduct(this.product).subscribe((rez) => {
                if (rez.success) {
                    this.load(this.product.id);
                }
            });
        }
    }
}


