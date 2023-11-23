import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler){

        return this.authService.user.pipe(take(1), exhaustMap((user)=>{

            if (user == null){
                return next.handle(req)
            }

            const newReq = req.clone({
                // params: req.params.append('auth', user.token)
                params: new HttpParams().set('auth', user.token)
            })

            return next.handle(newReq)
        }))

    }



}
