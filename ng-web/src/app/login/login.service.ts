import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from 'app/app.constants';
import { Observable } from 'rxjs';

const Base64 = require('crypto-js/enc-base64');
const Utf8 = require('crypto-js/enc-utf8');

@Injectable({providedIn: 'root'})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');
        data.append('scope', 'read');
        let headers = new HttpHeaders();
        headers.set('Authorization', `Basic ${Base64.stringify(Utf8.parse(ENV.client_id + ':' + ENV.client_secret))}`);
        headers.set('Content-Type', undefined);
        headers.set(Headers.SHOW_ERROR, 'false');
        headers.set(Headers.BLOCK, '正在验证用户名密码...');
        return this.http.post('/uaa/oauth/token', data, {headers: headers});
    }

}