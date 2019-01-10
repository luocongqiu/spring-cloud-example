import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

export const loginRoute = RouterModule.forChild([{
    path: 'login',
    component: LoginComponent
}]);
