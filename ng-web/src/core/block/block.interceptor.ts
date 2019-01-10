import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from 'app/app.constants';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { isPresent } from 'share';
import { Block } from './block';

@Injectable({ providedIn: 'root' })
export class BlockInterceptor implements HttpInterceptor {

    constructor(private block: Block) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let message = req.headers.get(Headers.BLOCK);
        if (isPresent(message)) {
            if (message !== 'false') {
                this.block.show(message);
            }
            req = req.clone({ headers: req.headers.delete(Headers.BLOCK) });
        } else if (req.method === 'GET') {
            this.block.show();
        } else if (req.method === 'POST') {
            this.block.show('正在保存数据...');
        } else if (req.method === 'PUT') {
            this.block.show('正在修改数据...');
        } else if (req.method === 'DELETE') {
            this.block.show('正在删除数据...');
        }
        return next.handle(req).pipe(switchMap<any, any>(res => {
            let isRes = res instanceof HttpResponse;
            if (isRes && message !== 'false') {
                this.block.hide();
            }
            return of(res);
        }), catchError(res => {
            if (message !== 'false') {
                this.block.hide();
            }
            return throwError(res);
        }));
    }
}