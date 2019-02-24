import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../+shared/services/products.service';
import {CategoriesService} from '../../+shared/services/categories.service';

@Component({
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

    product: any = {};
    categories = [];
    wasSubmitted = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productsService: ProductsService,
                private categoriesService: CategoriesService) {

    }

    ngOnInit() {
        this.categoriesService.getAll().subscribe(rez => {
            this.categories = rez.result;
        });
    }

    uploadFile(e: any) {
        this.product.image = e.target.files[0];
    }

    saveProduct() {
        this.wasSubmitted = true;

        if (this.product.name &&
            this.product.price &&
            this.product.category_id) {

            console.log(this.product);

            this.productsService.saveProduct(this.product).subscribe((responce) => {
                if (responce.result.success) {
                  this.router.navigate(['/backend/products/edit/', responce.result.id]);
                }
            });
        }
    }

}
