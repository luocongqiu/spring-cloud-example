import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InterceptedRequest, InterceptedResponse } from 'share';

export interface Interceptor {
    request?(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest;
    response?(response: InterceptedResponse): Observable<InterceptedResponse> | InterceptedResponse;
    transform?(pre: Response | InterceptedResponse | any, response: InterceptedResponse): Observable<Response>
        | Observable<InterceptedResponse>
        | Observable<any>;
}
