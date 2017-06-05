import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollBarDirective} from './scroll-bar.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ScrollBarDirective],
    exports: [CommonModule, ScrollBarDirective]
})
export class ScrollBarModule {

}