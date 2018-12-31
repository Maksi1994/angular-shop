import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OneProductComponent} from './products/one-product/one-product.component';
import {BackendComponent} from './backend.component';
import {ListProductsComponent} from './products/list-products/list-products.component';
import {NavComponent} from './+shared/components/nav/nav.component';
import {ProductsService} from './+shared/services/products.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {CategoriesService} from './+shared/services/categories.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
    declarations: [
        ListProductsComponent,
        OneProductComponent,
        BackendComponent,
        CreateProductComponent,
        NavComponent,
    ],
    imports: [
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
                    {path: '', component: BackendComponent, redirectTo: 'products/list/1', pathMatch: 'full'},
                    {path: 'products/list/:page', component: ListProductsComponent},
                    {path: 'products/edit/:id', component: OneProductComponent},
                    {path: 'products/create', component: CreateProductComponent},
                ]
            }
        ])
    ],
    providers: [ProductsService, CategoriesService],
    bootstrap: [BackendComponent]
})
export class BackendModule {
}
