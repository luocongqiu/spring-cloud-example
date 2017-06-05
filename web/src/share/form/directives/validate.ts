import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const ERROR_MESSAGES = {
    required: '不能为空',
    email: '邮箱格式不正确'
};

@Directive({
    selector: 'form:not([novalidate])', // tslint:disable-line
    host: {'attr.novalidate': 'novalidate'} // tslint:disable-line
})
export class FormDirective implements OnInit, OnDestroy {

    private _formItems: Array<FormItem> = [];
    private _subscriptions: Array<Subscription> = [];

    constructor(private ngForm: NgForm, private element: ElementRef) {

    }

    ngOnInit(): void {

        const submitSubscription = Observable
            .fromEvent($(this.element.nativeElement), 'submit')
            .subscribe(() => {
                this._formItems.forEach(item => item.showError());
            });
        this._subscriptions.push(submitSubscription);

        let keysCheckSubscription = Observable.interval(300)
            .map<any, string[]>(() => Object.keys(this.ngForm.controls))
            .distinctUntilChanged((keys1: string[], keys2: string[]) => {
                return keys1.join(',') === keys2.join(',');
            })
            .subscribe((keys) => {
                this._initForm(keys);
            });

        this._subscriptions.push(keysCheckSubscription);
    }

    private _initForm(keys: string[]) {
        this._formItems.forEach(item => item.destroy());
        this._formItems = [];
        keys.forEach(key => this._formItems.push(new FormItem(<FormControl>this.ngForm.controls[key], key, $(this.element.nativeElement))));
    }

    ngOnDestroy(): void {
        Observable.from(this._formItems).subscribe((formItem) => formItem.destroy());
        Observable.from(this._subscriptions).subscribe((subscription) => subscription.unsubscribe());
    }
}

class FormItem {
    control: FormControl;
    name: string;
    form: JQuery;

    private _element: JQuery;
    private _tooltip: Tooltip;
    private _subscriptions: Array<Subscription> = [];

    constructor(control: FormControl, name: string, form: JQuery) {
        this.control = control;
        this.name = name;
        this.form = form;
        this._init();
    }

    private _init(): void {
        this._element = this.form.find(`input[name=${this.name}],select[name=${this.name}],textarea[name=${this.name}]`);
        let target = this._element.nextAll().last();
        if (target.length === 0) {
            target = this._element;
        }
        let tooltip = new Tooltip({
            target: target[0],
            content: 'my tooltip',
            position: 'right middle bottom middle',
            openOn: '',
        });
        $(tooltip.drop.drop).removeClass('tooltip');
        this._tooltip = tooltip;

        const subscription = this.control.valueChanges
            .filter(() => this.control.invalid)
            .subscribe(() => this.showError());
        this._subscriptions.push(subscription);
    }

    showError() {

        if (!this.control.errors) {
            return;
        }
        Observable.from(Object.keys(this.control.errors))
            .first()
            .do((key) => {
                let msg = this.control.errors[key] !== true ? this.control.errors[key] : ERROR_MESSAGES[key];
                $(this._tooltip.drop.content).html(msg);
                this._tooltip.open();
                this._element.addClass('form-error');
            })
            .ignoreElements()
            .concat(this.control.valueChanges)
            .filter(() => this.control.valid)
            .first()
            .subscribe(() => {
                this._tooltip.close();
                this._element.removeClass('form-error');
            });
    }

    destroy() {
        if (this._tooltip) {
            this._tooltip.destroy();
        }
        if (this._element) {
            this._element.removeClass('form-error');
        }
        this._subscriptions.forEach(item => item.unsubscribe());
    }
}
