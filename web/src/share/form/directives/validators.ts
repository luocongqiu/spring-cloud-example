import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { FormValidators } from '../validators';

const MOBILE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MobileValidator),
    multi: true
};

@Directive({
    selector: '[mobile][formControlName],[mobile][formControl],[mobile][ngModel]', // tslint:disable-line
    providers: [MOBILE_VALIDATOR]
})
export class MobileValidator implements Validator { // tslint:disable-line
    private _enabled: boolean;
    private _onChange: () => void;

    @Input()
    set mobile(value: boolean|string) {
        this._enabled = value === '' || value === true || value === 'true';
        if (this._onChange) {
            this._onChange();
        }
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this._enabled ? FormValidators.mobile(c) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }
}

const EMAIL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidator),
    multi: true
};

@Directive({
    selector: '[email][formControlName],[email][formControl],[email][ngModel]', // tslint:disable-line
    providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator { // tslint:disable-line
    private _enabled: boolean;
    private _onChange: () => void;

    @Input()
    set email(value: boolean|string) {
        this._enabled = value === '' || value === true || value === 'true';
        if (this._onChange) {
            this._onChange();
        }
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this._enabled ? FormValidators.email(c) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }
}