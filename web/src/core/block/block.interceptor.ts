import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { InterceptedRequest, InterceptedResponse, Interceptor } from 'share';
import { Block } from './block';
import { HeaderMessage } from 'app/app.constants';

@Injectable()
export class BlockInterceptor implements Interceptor {

    constructor(private block: Block) {
    }

    request(request: InterceptedRequest): Observable<InterceptedRequest> | InterceptedRequest {
        let message = request.options.headers.get(HeaderMessage.BLOCK_MESSAGE);
        if (message) {
            this.block.show(message);
            request.options.headers.delete(HeaderMessage.BLOCK_MESSAGE);
            return request;
        }
        if (request.options.method === RequestMethod.Get) {
            this.block.show();
        } else if (request.options.method === RequestMethod.Post) {
            this.block.show('正在保存数据...');
        } else if (request.options.method === RequestMethod.Put) {
            this.block.show('正在修改数据...');
        } else if (request.options.method === RequestMethod.Delete) {
            this.block.show('正在删除数据...');
        }
        return request;
    }

    response(response: InterceptedResponse): Observable<InterceptedResponse> | InterceptedResponse {
        this.block.hide();
        return response;
    }
}