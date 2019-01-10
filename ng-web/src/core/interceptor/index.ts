import { FactoryProvider } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { Interceptor, InterceptorService } from 'share';
import { BlockInterceptor } from '../block/block.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { CommonInterceptor } from './common.interceptor';
import { DelInterceptor } from './del.interceptor';

function interceptorProvider(...interceptors: Interceptor[]): FactoryProvider {

    return {
        provide: Http,
        useFactory: function (...deps: any[]) {
            return new InterceptorService(deps[0], deps[1], ...deps.slice(2));
        },
        deps: [XHRBackend, RequestOptions, ...interceptors],
        multi: false
    };
}

export const interceptor = interceptorProvider(DelInterceptor, BlockInterceptor, CommonInterceptor, AuthInterceptor);
export { CommonInterceptor } from './common.interceptor';