import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { loginRoute } from './login.route';

@NgModule({
    imports: [
        loginRoute,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}