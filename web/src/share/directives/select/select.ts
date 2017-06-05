import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Select } from './model';

@Directive({
    selector: '[aiSelect]'
})
export class TetherSelectDirective implements OnInit, OnDestroy {

    private select: Select;
    private subscriptions: Array<Subscription> = [];

    constructor(private element: ElementRef, private model: NgModel) {
    }

    ngOnInit() {
        this.select = new Select({
            el: this.element.nativeElement
        });

        let optionSubscription = Observable.interval(300)
            .map<any, string>(() => {
                const options = $(this.element.nativeElement).find('option');
                let text = '';
                for (let i = 0; i < options.length; i++) {
                    let el = $(options[i]);
                    text += `${el.attr('value')}:${el.text()}`;
                }
                return text;
            })
            .distinctUntilChanged()
            .subscribe(() => this.select.render());

        this.subscriptions.push(optionSubscription);

        let modalSubscription = this.model.valueChanges
            .filter(value => !!value)
            .first()
            .subscribe(() => {
                this.select.render();
            });
        this.subscriptions.push(modalSubscription);
    }

    ngOnDestroy(): void {
        if (this.select) {
            this.select.destroy();
        }
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}