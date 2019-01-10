import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockInterceptor } from './block/block.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DelInterceptor } from './interceptor/del.interceptor';
import { ErrorInterceptor } from './interceptor/Error.interceptor';
import { IslamicCivilI18n } from './providers';

const COMPONENTS = [];

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
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: DelInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: BlockInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: NgbDatepickerI18n, useClass: IslamicCivilI18n}
    ]
})
export class CoreModule {
}
