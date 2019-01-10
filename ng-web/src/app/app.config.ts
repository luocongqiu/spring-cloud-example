import { NgbModalConfig, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

export function globalConfig() {
    configToastr();
}

function configToastr() {
    toastr.options.closeButton = true;
    toastr.options.timeOut = 2000;
    toastr.options.progressBar = true;
    toastr.options.preventDuplicates = true;
}

export function configPage(config: NgbPaginationConfig): void {
    config.maxSize = 5;
    config.rotate = true;
    config.disabled = false;
    config.boundaryLinks = false;
    config.directionLinks = true;
    config.ellipses = true;
    config.pageSize = 10;
    config.size = 'sm';
}

export function configModal(config: NgbModalConfig) {
    config.backdrop = 'static';
}
