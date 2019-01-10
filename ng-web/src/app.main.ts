import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { globalConfig } from 'app/app.config';
import { AppModule } from 'app/app.module';
import { environment } from './environments/environment';
import './vendor';

globalConfig();

if (module['hot']) {
    module['hot'].accept();
}

export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(environment.decorateModuleRef)
        .catch((err) => console.error(err));
}

switch (document.readyState) {
    case 'loading':
        document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
        break;
    case 'interactive':
    case 'complete':
    default:
        main();
}

function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
}
