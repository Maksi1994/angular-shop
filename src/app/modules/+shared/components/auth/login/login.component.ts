import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {take} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user: any = {};
    allRoles = [];
    wasSubmitted = false;
    isValidEmail = true;

    constructor(private userService: UserService,
                private router: Router) {

    }

    ngOnInit() {
        this.userService.getAllRoles().subscribe((res) => {
            this.allRoles = res.result;
        });
    }

    login() {
        const isMatchRegExp = this.user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        this.wasSubmitted = true;
        this.isValidEmail = !!isMatchRegExp;

        if (this.isValidEmail && this.user.password.length >= 4) {
            this.userService.login(this.user);

            this.userService.login$.pipe(take(1)).subscribe(() => {
                if (this.userService.isAdmin()) {
                    this.router.navigate(['/backend']);
                } else {
                    this.router.navigate(['/']);
                }
            });
        }
    }
}
