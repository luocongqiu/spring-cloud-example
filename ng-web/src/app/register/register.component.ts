import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'a-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.scss']
})

export class RegisterComponent implements OnInit {

    user: any;

    constructor() {
    }

    ngOnInit() {
        this.user = {};
    }

    submit(form: NgForm): void {

        if (form.invalid) {
            return;
        }
    }
}