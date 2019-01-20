import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AjaxService} from './modules/+shared/services/ajax.service';
import {HttpClientModule} from '@angular/common/http';
import {AppCookieService} from './modules/+shared/services/app-cookie.service';
import {LoginComponent} from './modules/+shared/components/auth/login/login.component';
import {RegistComponent} from './modules/+shared/components/auth/regist/regist.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './modules/+shared/services/user.service';
import {AppStorage} from '../storage/universal.inject';
import {UniversalStorage} from '../storage/server.storage';
import {CookieStorage} from '../storage/browser.storage';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistComponent
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            {path: 'backend', loadChildren: './modules/backend/backend.module#BackendModule'},
            {path: 'login', pathMatch: 'full', component: LoginComponent},
            {path: 'regist', pathMatch: 'full', component: RegistComponent},
            {path: '**', loadChildren: './modules/frontend/frontend.module#FrontendModule'},
        ]),
        TransferHttpCacheModule,
        BrowserAnimationsModule,
    ],
    providers: [
        AjaxService,
        CookieService,
        AppCookieService,
        UserService,
        {provide: AppStorage, useClass: CookieStorage},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
