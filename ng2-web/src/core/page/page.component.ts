import { OnInit } from '@angular/core';
import { IPageService, Page } from 'core';
export abstract class PageComponent<T> implements OnInit {

    page: Page<T>;
    params: { page_no?: number, page_size?: number, [index: string]: any };
    items: Array<T> = [];
    private _pageNo = 1;

    constructor(private pageService: IPageService) {
        this.page = {page_no: this._pageNo, page_size: 10};
        this.params = {};
    }

    qry(initPageNo = true): void {
        if (initPageNo) {
            this._pageNo = this.page.page_no = 1;
        }
        this._qry();
    }

    private _qry(): void {
        this.params.page_size = this.page.page_size;
        this.params.page_no = this.page.page_no;
        this.pageService.qryByPage(this.params)
            .map<any, Page<T>>(res => ({
                total_row: res.row_count,
                total_page: res.page_count,
                items: res.page_data
            }))
            .subscribe(page => {
                this.page.total_row = page.total_row;
                this.page.total_page = Math.ceil(page.total_row / this.page.page_size);
                this.items = page.items;
                this.afterPage();
            });
    }


    ngOnInit(): void {
        this.qry();
    }

    get pageNo(): number {
        return this._pageNo;
    }

    set pageNo(value: number) {
        this._pageNo = value;
        this.page.page_no = value;
        this._qry();
    }

    afterPage() {
    }
}