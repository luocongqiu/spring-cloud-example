import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerRoute } from 'app/register/register.route';
import { ShareModule } from 'share';

import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        registerRoute,
        FormsModule,
        ShareModule
    ],
    declarations: [
        RegisterComponent
    ]
})
export class RegisterModule {
}
