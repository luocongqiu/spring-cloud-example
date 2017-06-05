import { enableProdMode } from '@angular/core';
import { DEBUG_INFO_ENABLED } from './app.constants';

export function prodConfig() {
    // disable debug data on prod profile to improve performance
    if (!DEBUG_INFO_ENABLED) {
        enableProdMode();
    }
}

export function globalConfig() {
    configToastr();
}

function configToastr() {
    toastr.options.closeButton = true;
    toastr.options.timeOut = 2000;
    toastr.options.progressBar = true;
    toastr.options.preventDuplicates = true;
}
