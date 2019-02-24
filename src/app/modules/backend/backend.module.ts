import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OneProductComponent} from './products/one-product/one-product.component';
import {BackendComponent} from './backend.component';
import {ListCategoriesComponent} from './categories/list-categories/list-categories.component';
import {NavComponent} from './+shared/components/nav/nav.component';
import {ProductsService} from './+shared/services/products.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {CategoriesService} from './+shared/services/categories.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { NouisliderModule } from 'ng2-nouislider';
import {OneCategoryComponent} from './categories/one-category/one-category.component';
import {ListProductsComponent} from './products/list-products/list-products.component';
import {CreateCategoryComponent} from './categories/create-category/create-category.component';
import {OrdersService} from './+shared/services/orders.service';
import {ListOrdersComponent} from './orders/list-orders/list-orders.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OneOrderComponent} from './orders/one-order/one-order.component';
import {ListPromotionsComponent} from './promotions/list-promotions/list-promotions.component';
import {PromotionsService} from './+shared/services/promotions.service';

@NgModule({
    declarations: [
        ListPromotionsComponent,
        OneProductComponent,
        BackendComponent,
        CreateProductComponent,
        NavComponent,
        OneCategoryComponent,
        ListCategoriesComponent,
        ListProductsComponent,
        CreateCategoryComponent,
        ListOrdersComponent,
        OneOrderComponent
    ],
    imports: [
        NgbModule,
        NouisliderModule,
        NgSelectModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
        RouterModule.forChild([
            {
                path: '', component: BackendComponent,
                children: [
                    {path: '', component: BackendComponent, redirectTo: 'products/list', pathMatch: 'full'},

                    {path: 'products', redirectTo: '/backend/products/list', pathMatch: 'full'},
                    {path: 'products/list', component: ListProductsComponent},
                    {path: 'products/list/:page', component: ListProductsComponent},
                    {path: 'products/edit/:id', component: OneProductComponent},
                    {path: 'products/create', component: CreateProductComponent},

                    {path: 'categories', redirectTo: '/backend/categories/list', pathMatch: 'full'},
                    {path: 'categories/list', component: ListCategoriesComponent},
                    {path: 'categories/edit/:id', component: OneCategoryComponent},
                    {path: 'categories/create', component: CreateCategoryComponent},

                    {path: 'orders', redirectTo: '/backend/orders/list', pathMatch: 'full'},
                    {path: 'orders/list', component: ListOrdersComponent},
                    {path: 'orders/list/:page', component: ListOrdersComponent},
                    {path: 'orders/edit/:id', component: OneOrderComponent},

                    {path: 'promotions', redirectTo: '/backend/promotions/list', pathMatch: 'full'},
                    {path: 'promotions/list', component: ListPromotionsComponent},
                    {path: 'promotions/list/page', component: ListPromotionsComponent},

                ]
            }
        ])
    ],
    providers: [ProductsService, CategoriesService, OrdersService, PromotionsService],
    bootstrap: [BackendComponent]
})
export class BackendModule {
}
