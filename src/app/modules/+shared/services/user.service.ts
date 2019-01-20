import {Injectable} from '@angular/core';
import {AjaxService} from './ajax.service';
import {Observable, Subject} from 'rxjs';
import {AppCookieService} from './app-cookie.service';
import {mapTo, tap} from 'rxjs/internal/operators';

@Injectable()
export class UserService {

    user;
    login$: Subject<any> = new Subject<any>();
    logout$: Subject<any> = new Subject<any>();

    constructor(private ajaxService: AjaxService,
                private appCookieService: AppCookieService) {

    }

    public login(data) {
        this.ajaxService.post('/users/login', data, false).subscribe((res) => {
            this.appCookieService.set('authToken', res.access_token);

            this.getUser().subscribe(() => {
                this.login$.next(this.user);
            });
        });
    }

    public logOut() {
        this.ajaxService.post('/users/logout', {}, false).subscribe((res) => {
            this.appCookieService.remove('authToken');
            this.user = null;

            this.logout$.next(null);
        });
    }

    public getUser() {
        return this.ajaxService.post('/users/get-auth-user', null, false).pipe(tap((rez) => {
            this.user = rez.result;
        }));
    }

    public isLogin(): boolean| Observable<boolean> {
        if (this.user) {
            return true;
        }

        return this.ajaxService.post('/users/get-auth-user', null, false)
            .pipe(tap((rez) => {
                this.user = rez.result;
            }), mapTo(!!this.user));
    }

    public getAllRoles() {
        return this.ajaxService.post('/users/get-all-roles');
    }

    public isAdmin() {
        return this.user.role === 'admin';
    }

}
