import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AjaxService} from './modules/+shared/services/ajax.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from './modules/+shared/services/cookie.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            {path: 'backend', loadChildren: './modules/backend/backend.module#BackendModule'},
            {path: '', pathMatch: 'full', loadChildren: './modules/frontend/frontend.module#FrontendModule'}
        ]),
        TransferHttpCacheModule,
        BrowserAnimationsModule,
    ],
    providers: [AjaxService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
