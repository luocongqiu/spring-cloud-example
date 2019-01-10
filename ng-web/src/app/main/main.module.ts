import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from 'share';
import { MainComponent } from './main.component';
import { routing } from './main.routing';
@NgModule({
    declarations: [MainComponent],
    imports: [routing, NgbModule, ShareModule]
})
export class MainModule {
}