import { NgModule } from '@angular/core';
import { TrimValueAccessor } from './directives/accessors';
import { FormDirective } from './directives/validate';
import { EmailValidator, MobileValidator } from './directives/validators';

const DIRECTIVES = [
    FormDirective,
    MobileValidator,
    EmailValidator,
    TrimValueAccessor
];
@NgModule({
    declarations: [...DIRECTIVES],
    exports: [...DIRECTIVES]
})
export class FormModule {

}