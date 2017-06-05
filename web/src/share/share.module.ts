import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'share';
import { AceEditorDirective, AutoFocusDirective, EchartsDirective, TetherSelectDirective } from './directives';
import { FormModule } from './form/form.module';
import { JsonKeyValuePipe, KeysPipe, MaxlengthPipe, OrderByPipe } from './pipes';
import { ScrollBarModule } from './scroll-bar/scroll-bar.module';

const COMPONENTS = [];
const DIRECTIVES = [
    AceEditorDirective,
    TetherSelectDirective,
    EchartsDirective,
    AutoFocusDirective
];
const PIPES = [
    KeysPipe,
    OrderByPipe,
    MaxlengthPipe,
    JsonKeyValuePipe
];
const SERVICES = [
    EventManager
];
const MODULES = [
    CommonModule,
    ScrollBarModule,
    FormModule
];

@NgModule({
    imports: [
        NgbModule,
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class ShareModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: ShareModule,
            providers: [
                ...SERVICES
            ],
        };
    }
}