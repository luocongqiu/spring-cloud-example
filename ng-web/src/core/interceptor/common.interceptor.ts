import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HeaderMessage } from 'app/app.constants';
import { Observable } from 'rxjs/Observable';
import { InterceptedRequest, InterceptedResponse, Interceptor } from 'share';

@Injectable()
export class CommonInterceptor implements Interceptor {

    constructor() {
    }

    request(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest {

        if (!request.options.headers.has('Content-Type')) {
            request.options.headers.set('Content-Type', 'application/json');
        } else if (request.options.headers.get('Content-Type') === undefined) {
            request.options.headers.delete('Content-Type');
        }
        return request;
    }

    response(response: InterceptedResponse): Observable<InterceptedResponse> | InterceptedResponse {
        if (response.response.ok) {
            return response;
        }
        if (response.request.options.headers.has(HeaderMessage.SHOW_ERROR_MESSAGE)) {
            response.request.options.headers.delete(HeaderMessage.SHOW_ERROR_MESSAGE);
            return response;
        }
        try {
            let obj = response.response.json();
            if (!!obj && obj['message']) {
                toastr.error(obj['message']);
            } else {
                toastr.error(response.response.statusText);
            }
        } catch (error) {
            toastr.error(response.response.statusText);
        }
        return response;
    }


    transform(pre: Response | InterceptedResponse | any, response: InterceptedResponse): Observable<Response>
        | Observable<InterceptedResponse>
        | Observable<any> {
        if (response.request.options.headers.get(HeaderMessage.TRANSFORM_TO_JSON) !== 'false') {
            if (pre instanceof Response) {
                return Observable.of<Response>(pre).map(value => value.json());
            } else if (pre && pre.response instanceof Response) {
                return Observable.of<Response>(pre.response).map(value => {
                    try {
                        return value.json();
                    } catch (error) {
                        console.info(error);
                    }
                    return undefined;
                });
            }
        }
        return pre.response ? Observable.of(pre.response) : Observable.of(pre);
    }
}