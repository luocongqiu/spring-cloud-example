import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AceEditorDirective, AutoFocusDirective, EchartsDirective } from './directives';
import { JsonKeyValuePipe, KeysPipe, MaxlengthPipe, OrderByPipe } from './pipes';

const COMPONENTS = [];
const DIRECTIVES = [
    AceEditorDirective,
    EchartsDirective,
    AutoFocusDirective
];
const PIPES = [
    KeysPipe,
    OrderByPipe,
    MaxlengthPipe,
    JsonKeyValuePipe
];
const MODULES = [
    CommonModule,
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
}