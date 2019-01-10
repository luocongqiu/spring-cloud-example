import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'a-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.scss']
})
export class LoginComponent {

    username: string;
    password: string;
    error: string;

    constructor(private router: Router) {
    }

    login() {
        this.router.navigate(['pages']);
    }

}