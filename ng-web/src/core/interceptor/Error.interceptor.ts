import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from 'app/app.constants';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPresent } from 'share';
import { Block } from '../block/block';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private block: Block) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let message = req.headers.get(Headers.BLOCK);
        if (req.headers.get(Headers.SHOW_ERROR) === 'false') {
            return next.handle(req.clone({ headers: req.headers.delete(Headers.SHOW_ERROR) }));
        }
        return next.handle(req).pipe(catchError<any, any>(res => {
            if (message !== 'false') {
                this.block.hide();
            }
            let obj = res.error;
            if (typeof obj === 'string') {
                toastr.error(res.message || obj);
            } else if (isPresent(obj) && obj['message']) {
                toastr.error(obj['message']);
            } else {
                toastr.error(obj.text || res.message || res.statusText);
            }

            if (isPresent(obj) && obj['code'] === '501') {
                this.router.navigate(['login']);
                return EMPTY;
            }
            return throwError(res);
        }));
    }
}