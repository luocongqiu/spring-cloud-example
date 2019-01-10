import { Observable } from 'rxjs/Observable';

export interface IPageService {
    qryByPage(page_params: { page_no?: number, page_size?: number, [key: string]: any }): Observable<any>;
}
