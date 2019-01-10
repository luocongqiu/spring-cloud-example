import { Response } from '@angular/http';
import { InterceptedRequest } from 'share';

export interface InterceptedResponse {
    response: Response;
    request: InterceptedRequest;
    interceptorOptions?: any;
}