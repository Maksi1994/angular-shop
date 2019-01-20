import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegistComponent} from '../components/auth/regist/regist.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistComponent
    ],
    imports: [
    ],
    providers: [
        // don't provide any servises here
    ],
    bootstrap: []
})
export class SharedModule {
}
