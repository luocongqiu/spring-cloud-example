import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules});
