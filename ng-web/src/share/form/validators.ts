import { AbstractControl, Validators } from '@angular/forms';
import { isPresent } from '../facade/lang';


const MOBILE_REGEXP = /^1[2-9]\d{9}$/;

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class FormValidators {
    static mobile(control: AbstractControl): {[key: string]: any} {
        if (isPresent(Validators.required(control))) {
            return null;
        }
        return MOBILE_REGEXP.test(control.value) ? null : {mobile: '电话号码格式不正确'};
    }

    static email(control: AbstractControl): {[key: string]: any} {
        if (isPresent(Validators.required(control))) {
            return null;
        }
        return EMAIL_REGEXP.test(control.value) ? null : {mobile: '邮箱格式不正确'};
    }
}