import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontendComponent} from './frontend.component';

@NgModule({
    declarations: [
        FrontendComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: '', component: FrontendComponent, redirectTo: '/backend/products/list/1', pathMatch: 'full'},
        ])
    ],
    providers: [],
    bootstrap: [FrontendComponent]
})
export class FrontendModule {
}
