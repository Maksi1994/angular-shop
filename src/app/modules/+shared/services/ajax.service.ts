import {environment} from '../../../../../.env/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransferState, makeStateKey } from '@angular/platform-browser';
import {AppCookieService} from './app-cookie.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AjaxService {

  public baseUrl = environment.API_URL;

  constructor(private http: HttpClient,
                public router: Router,
                public cookie: AppCookieService,
                private state: TransferState) {

  }

  /*
   * AJAX - POST method
   *
   * @param url:string - url for request
   * @param paramsObj: json - optional params
   * @return Observable
   */
  post(url: string, paramsObj?: object, store = true) {
      const params = new URLSearchParams();
      const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      const authToken = this.cookie.get('authToken');
      let stateKey;
      // Auth header

      if (authToken) {
          headers['Authorization'] = 'Bearer ' + authToken;
      }

      // Request params
      let urlHash = url;
      if (paramsObj && !_.isEmpty(paramsObj)) {
          _.forEach(paramsObj, (val, key) => {
              if (!_.isUndefined(val)) {
                  params.append(key, val);
              }
          });
          urlHash += this.generateHash(JSON.stringify(paramsObj));
      }
      if (store) {
          stateKey = makeStateKey(urlHash);
          const stateTransferData = this.state.get(stateKey, null as any);

          // Return from store
          if (stateTransferData) {
              return of(stateTransferData);
          }
      }
      return this.http.post(this.baseUrl + url, params.toString(), {headers: new HttpHeaders(headers)})
        .pipe(map(res => this.handleSuccess(res, stateKey)));
  }


  /*
   * AJAX - POST method with file
   *
   * @param url:string - url for request
   * @param paramsObj: json - optional params
   * @return Observable
   */
  file(url: string, paramsObj?: object) {
      const params = new FormData();
      const headers = {enctype: 'multipart/form-data'};
      const isAuth = this.cookie.get('authToken');

      // Auth header
      if (isAuth) {
          headers['Authorization'] = 'Bearer ' + isAuth;
      }

      // Request params
      if (paramsObj && !_.isEmpty(paramsObj)) {
          _.forEach(paramsObj, (val, key) => {
              if (!_.isUndefined(val)) {
                  params.append(key, val);
              }
          });
      }

      return this.http.post(this.baseUrl + url, params, {headers: new HttpHeaders(headers)})
      .pipe(map(res => this.handleSuccess(res, url)))
  }

  generateHash(text: string) {
    let hash = 0;
    if (text.length === 0) {
        return hash;
    }
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
  }

  // Get success results
  handleSuccess(res, stateKey?) {
      if (!_.isEmpty(res) && stateKey) {
          this.state.set(stateKey, res as any);

      }
      return res;
  }


}
