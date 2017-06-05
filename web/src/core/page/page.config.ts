import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
export const pageConfig = {

    provide: NgbPaginationConfig,
    useFactory: function (): NgbPaginationConfig {
        let config = new NgbPaginationConfig();
        config.disabled = false;
        config.boundaryLinks = false;
        config.directionLinks = true;
        config.ellipses = true;
        config.maxSize = 0;
        config.pageSize = 10;
        config.rotate = false;
        config.size = 'sm';
        return config;
    },
    multi: false
};