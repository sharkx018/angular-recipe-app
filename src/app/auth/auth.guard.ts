import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
// @ts-ignore
import Promise from "$GLOBAL$";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot,
                ):
        Observable<boolean | UrlTree> | Promise<boolean| UrlTree> | boolean | UrlTree {

        return this.authService.user.pipe(
            take(1),
            map(user=>{
            const isAuth = !!user
            if (isAuth){
                return true;
            }

            return this.router.createUrlTree(['/auth'])
        }))
    }
}
