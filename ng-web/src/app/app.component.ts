import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { configModal, configPage } from './app.config';

@Component({
    selector: 'a-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private pageConfig: NgbPaginationConfig,
                private modalConfig: NgbModalConfig) {
    }

    ngOnInit(): void {
        configPage(this.pageConfig);
        configModal(this.modalConfig);
    }
}