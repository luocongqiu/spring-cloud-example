import {BaseRequestOptions, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        // this.headers.set('Content-Type', 'application/json');
    }
}

export const requestOptionsProvider = {provide: RequestOptions, useClass: DefaultRequestOptions};