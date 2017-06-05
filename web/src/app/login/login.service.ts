import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HeaderMessage } from 'app/app.constants';
import { Observable } from 'rxjs/Observable';

const Base64 = require('crypto-js/enc-base64');
const Utf8 = require('crypto-js/enc-utf8');

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<any> {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');
        data.append('scope', 'read');
        let headers = new Headers();
        headers.set('Authorization', `Basic ${Base64.stringify(Utf8.parse(ENV.client_id + ':' + ENV.client_secret))}`);
        headers.set('Content-Type', undefined);
        headers.set(HeaderMessage.SHOW_ERROR_MESSAGE, 'false');
        headers.set(HeaderMessage.BLOCK_MESSAGE, '正在验证用户名密码...');
        return this.http.post('/uaa/oauth/token', data, {headers: headers});
    }

}