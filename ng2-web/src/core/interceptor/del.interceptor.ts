import { Injectable } from '@angular/core';
import { Headers, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { HeaderMessage } from 'app/app.constants';
import { Observable } from 'rxjs/Observable';
import { Alert, InterceptedRequest, Interceptor } from 'share';

@Injectable()
export class DelInterceptor implements Interceptor {

    request(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest {
        if (request.options.method === RequestMethod.Delete) {
            let message = request.options.headers.get(HeaderMessage.DELETE_MESSAGE);
            request.options.headers.delete(HeaderMessage.DELETE_MESSAGE);
            return Observable.fromPromise(Alert.confirm(message || '确定删除？')).catch(() => {
                return Observable.throw(new Response(new ResponseOptions({
                    body: null,
                    status: 0,
                    statusText: 'cancelled',
                    headers: new Headers()
                })));
            }).mergeMap(() => Observable.of(request));
        }
        return request;
    }
}