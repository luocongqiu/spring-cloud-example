import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModule } from 'app/register/register.module';
import { Ng2Webstorage } from 'ng2-webstorage';
import { ShareModule } from 'share';
import { CoreModule } from '../core/core.module';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ShareModule.forRoot(),
        CoreModule.forRoot(),
        NgbModule.forRoot(),
        Ng2Webstorage,
        LoginModule,
        RegisterModule,
        MainModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: Window, useValue: window},
        {provide: Document, useValue: document}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
