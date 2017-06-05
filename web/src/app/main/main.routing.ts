import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

export const routing = RouterModule.forChild([
    {
        path: 'pages',
        component: MainComponent
    }
]);

