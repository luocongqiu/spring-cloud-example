import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from 'app/app.constants';
import { Token } from 'app/login/login.model';
import { LocalStorageService } from 'ngx-webstorage';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPresent } from 'share';
import { Block } from '../block/block';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: LocalStorageService, private router: Router, private block: Block) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: Token = this.storage.retrieve('token');
        if (req.headers.get(Headers.NEED_AUTHORIZATION) !== 'false' && !req.headers.has('Authorization') && isPresent(token) && isPresent(token.access_token)) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token.access_token}`) });
        }
        req = req.clone({ headers: req.headers.delete(Headers.NEED_AUTHORIZATION) });
        return next.handle(req).pipe(catchError<any, any>(res => {
            if (res.status !== 401) {
                return throwError(res);
            }
            if (req.url.indexOf('/oauth/token') !== -1) {
                return throwError(res);
            }
            this.storage.clear('token');
            this.storage.clear('user');
            this.router.navigate(['login']);
            this.block.hideAll();
            return EMPTY;

        }));
    }
}