import { ConnectionBackend, Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InterceptedRequest, InterceptedResponse, Interceptor, InterceptorOptions } from './';

export class InterceptorService extends Http {
    private interceptors: Array<Interceptor>;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, ...interceptors: Interceptor[]) {
        super(backend, defaultOptions);
        this.interceptors = interceptors;
    }


    get(url: string, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Get;
        options.url = options.url || url;
        return this.request(url, options);
    }

    post(url: string, body: any, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Post;
        options.url = options.url || url;
        options.body = options.body || body;
        return this.request(url, options);
    }

    put(url: string, body: any, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Put;
        options.url = options.url || url;
        options.body = options.body || body;
        return this.request(url, options);
    }

    delete(url: string, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Delete;
        options.url = options.url || url;
        return this.request(url, options);
    }

    patch(url: string, body: any, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Patch;
        options.url = options.url || url;
        options.body = options.body || body;
        return this.request(url, options);
    }

    head(url: string, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Head;
        options.url = options.url || url;
        return this.request(url, options);
    }

    options(url: string, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        options.method = options.method || RequestMethod.Options;
        options.url = options.url || url;
        return this.request(url, options);
    }

    request(url: string | Request, options?: InterceptorOptions): Observable<Response> {
        options = options || {};
        let responseObservable: any;
        if (typeof url === 'string') {
            responseObservable = this._httpRequest({
                url: url,
                options: options,
                interceptorOptions: options.interceptorOptions || {}
            });
        } else if (url instanceof Request) {
            let request: Request = url;
            responseObservable = this._httpRequest({
                url: request.url,
                options: {
                    method: request.method,
                    headers: request.headers,
                    url: request.url,
                    withCredentials: request.withCredentials,
                    responseType: request.responseType,
                    body: request.getBody()
                },
                interceptorOptions: options.interceptorOptions || {}
            });
        } else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    }

    private _httpRequest(request: InterceptedRequest): Observable<any> {
        request.options = request.options || {};
        request.options.headers = request.options.headers || new Headers();
        return this._runRequestInterceptors(request)
            .mergeMap<InterceptedRequest, InterceptedResponse>(value => Observable.zip(super.request(value.url, value.options), Observable.of(value.interceptorOptions), (response, interceptorOptions) => ({
                response,
                interceptorOptions,
                request
            })).catch(response => Observable.of({
                response,
                interceptorOptions: value.interceptorOptions || {},
                request
            })))
            .mergeMap(value => this._runResponseInterceptors(value))
            .mergeMap(value => value.response.ok ? Observable.of(value) : Observable.throw(value.response))
            .mergeMap(value => this._runTransform(value));
    }

    private _runRequestInterceptors(params: InterceptedRequest): Observable<InterceptedRequest> {

        let observable: Observable<InterceptedRequest> = Observable.of(params);

        this.interceptors.filter(interceptor => !!interceptor.request).forEach(interceptor => {
            observable = observable.mergeMap<InterceptedRequest, InterceptedRequest>(value => {
                const result = interceptor.request(value);
                if (!result) {
                    return Observable.of(value);
                } else if (result instanceof Observable) {
                    return result;
                } else {
                    return Observable.of(result);
                }
            });
        });

        return observable;
    }

    private _runResponseInterceptors(response: InterceptedResponse): Observable<InterceptedResponse> {

        let observable: Observable<InterceptedResponse> = Observable.of(response);
        [].concat(this.interceptors)
            .filter(interceptor => interceptor.response)
            .reverse()
            .forEach(interceptor => {
                observable = observable.mergeMap<InterceptedResponse, InterceptedResponse>(value => {
                    const result = interceptor.response(value);
                    if (!result) {
                        return Observable.of(value);
                    } else if (result instanceof Observable) {
                        return result;
                    } else {
                        return Observable.of(result);
                    }
                });
            });
        return observable;
    }

    private _runTransform(response: InterceptedResponse): Observable<any> {
        let transforms = this.interceptors.filter(interceptor => interceptor.transform);
        if (transforms.length === 0) {
            return Observable.of(response.response);
        }
        let observable: Observable<any> = Observable.of(response);
        transforms.forEach(interceptor => {
            observable = observable.mergeMap<any, any>(value => {
                let result = interceptor.transform(value, response);
                if (result instanceof Observable) {
                    return result;
                }
                return Observable.of(result);
            });
        });
        return observable;

    }
}
