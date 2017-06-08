import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductGuardService implements CanActivate, CanActivateChild {

    constructor(private router: Router, private storage: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
        | Promise<boolean>
        | boolean {

        let product = this.storage.retrieve('product');
        let user = this.storage.retrieve('user');
        if (product && product.product_id !== undefined && user && user.product_id !== undefined) {
            return true;
        }
        toastr.info('请选择产品');
        this.router.navigate(['pages/product']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
        | Promise<boolean>
        | boolean {
        return this.canActivate(childRoute, state);
    }
}