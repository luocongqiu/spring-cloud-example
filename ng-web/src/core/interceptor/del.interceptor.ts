import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from 'app/app.constants';
import { EMPTY, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Alert } from 'share';

@Injectable({ providedIn: 'root' })
export class DelInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'DELETE') {
            return next.handle(req);
        }

        return from(Alert.confirm(req.headers.get(Headers.DELETE) || '确定删除？')).pipe(
            switchMap<any, any>(res => {
                if (res.dismiss === 'cancel') {
                    return EMPTY;
                }
                return next.handle(req.clone({ headers: req.headers.delete(Headers.DELETE) }));
            }));
    }
}