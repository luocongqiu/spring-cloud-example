import { Component } from '@angular/core';
@Component({
    selector: 'ai-app',
    templateUrl: './app.component.html'
})
export class AppComponent {


    private _preLoaderElement: HTMLElement;

    constructor() {
        this._preLoaderElement = document.getElementById('pre-loader');
        this._hidePreLoader();
    }

    private _hidePreLoader() {
        setTimeout(() => {
            this._preLoaderElement.style.display = 'none';
        }, 1000);
    }
}