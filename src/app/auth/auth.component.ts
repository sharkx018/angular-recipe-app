import {Component, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Route, Router} from "@angular/router";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    // authSub: Subscription = new Subscription()
    isLoading = false
    error: string = null

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
        this.error = null
    }

    onSubmit(authForm: NgForm){
        if (!authForm.valid){
            return
        }

        let authObs :Observable<AuthResponseData>

        const email = authForm.value.email
        const password = authForm.value.password

        this.isLoading = true;
        this.error = null

        if (this.isLoginMode){
            authObs = this.authService.login(email, password)
        }else{
            authObs = this.authService.signUpNewUser(email, password)
        }

        authObs.subscribe(
            data=>{
            console.log(data)
            this.isLoading = false;
            this.router.navigate(['/recipes'])
        },errorMessage => {
            console.log("Error: ", errorMessage)
            this.isLoading = false;
            this.error = errorMessage
                this.showErrorAlert(errorMessage)
        })

        authForm.reset()
    }

    showErrorAlert(errorMessage: string){


    }

    ngOnDestroy() {
        // this.authSub.unsubscribe()
    }

}
