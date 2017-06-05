// tslint:disable
import { AfterViewInit, Directive, ElementRef } from '@angular/core';
@Directive({
    selector: '[autofocus]'
})
export class AutoFocusDirective implements AfterViewInit {

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}