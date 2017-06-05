import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private router: Router, private storage: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
        | Promise<boolean>
        | boolean {

        if (this.storage.retrieve('token')) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
        | Promise<boolean>
        | boolean {
        return this.canActivate(childRoute, state);
    }
}