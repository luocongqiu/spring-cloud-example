import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModule } from 'app/register/register.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
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
        HttpClientModule,
        FormsModule,
        ShareModule,
        CoreModule,
        NgbModule,
        LoginModule,
        RegisterModule,
        MainModule,
        NgxWebstorageModule.forRoot(),
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
