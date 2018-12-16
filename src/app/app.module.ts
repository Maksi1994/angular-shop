import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: 'backend', loadChildren: './modules/backend/backend.module#BackendModule'},
      { path: '', pathMatch: 'full', loadChildren: './modules/frontend/frontend.module#FrontendModule'}
    ]),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
