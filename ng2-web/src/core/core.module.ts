import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Block } from './block/block';
import { BlockInterceptor } from './block/block.interceptor';
import { CommonInterceptor, interceptor } from './interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DelInterceptor } from './interceptor/del.interceptor';
import { pageConfig } from './page/page.config';
import { AuthGuardService, ProductGuardService, requestOptionsProvider } from './providers';

const COMPONENTS = [
    // SideBarComponent,
    // MenuItemComponent
];

const SERVICES = [
    requestOptionsProvider,
    interceptor,
    DelInterceptor,
    CommonInterceptor,
    AuthInterceptor,
    pageConfig,
    AuthGuardService,
    ProductGuardService,
    Block,
    BlockInterceptor
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        ...COMPONENTS
    ],
    declarations: [
        ...COMPONENTS
    ],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [...SERVICES]
        };
    }
}
