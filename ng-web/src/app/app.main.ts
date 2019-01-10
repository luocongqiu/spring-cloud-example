import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { globalConfig, prodConfig } from './app.config';
import { AppModule } from './app.module';
import './vendor';

prodConfig();
globalConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);
