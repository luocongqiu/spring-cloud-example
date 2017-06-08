import { RouterModule } from '@angular/router';
import { RegisterComponent } from 'app/register/register.component';

export const registerRoute = RouterModule.forChild([{
    path: 'register',
    component: RegisterComponent
}]);
