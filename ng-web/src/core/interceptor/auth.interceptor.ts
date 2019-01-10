import { Injectable } from '@angular/core';
import { Token } from 'app/login/login.model';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs/Observable';
import { InterceptedRequest, Interceptor } from 'share';

@Injectable()
export class AuthInterceptor implements Interceptor {

    constructor(private storage: LocalStorageService) {
    }

    request(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest {
        let token: Token = this.storage.retrieve('token');
        if (!request.options.headers.has('Authorization') && !!token && !!token.access_token) {
            request.options.headers.set('Authorization', `Bearer ${token.access_token}`);
        }
        return request;
    }
}