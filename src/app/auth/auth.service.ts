import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environment/environment";


export interface AuthResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{


    user = new BehaviorSubject<User>(null)
    private tokenExpirationTimer:any

    FIREBASE_SIGN_UP_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    FIREBASE_SIGN_IN_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

    constructor(private httpClient: HttpClient,
                private router: Router) {}

    signUpNewUser(email: string, password: string){

        return this.httpClient
            .post<AuthResponseData>(
            this.FIREBASE_SIGN_UP_ENDPOINT + environment.FIREBASE_API_KEY,
            {
                    email: email,
                    password:password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((responseData)=>{
                    console.log(responseData)
                    this.handleAuthentication(responseData.expiresIn,
                        responseData.email,
                        responseData.localId,
                        responseData.idToken
                    )
                })
            )

    }

    login(email: string, password: string){

        return this.httpClient
            .post<AuthResponseData>(this.FIREBASE_SIGN_IN_ENDPOINT + environment.FIREBASE_API_KEY,{
            email:email,
            password: password,
            returnSecureToken: true
        })
            .pipe(
                catchError(this.handleError),
                tap((responseData)=>{
                    console.log(responseData)
                    this.handleAuthentication(responseData.expiresIn,
                        responseData.email,
                        responseData.localId,
                        responseData.idToken
                    )
                })
            )

    }

    autoLogin(){
        const parsedUser:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationTime:string,
        } = JSON.parse(localStorage.getItem('userData'))

        if (!parsedUser){
            return this.user.next(null)
        }

        const loadedUser = new User(parsedUser.email,parsedUser.id, parsedUser._token, new Date(parsedUser._tokenExpirationTime))

        if (loadedUser && loadedUser.token){
            this.user.next(loadedUser)
        }

        const timeLeft = new Date(parsedUser._tokenExpirationTime).getTime() - new Date().getTime()
        this.autoLogout(timeLeft)

    }

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer != null){
            clearInterval(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autoLogout(expirationTime: number){
        console.log(expirationTime)
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout()
        }, expirationTime)
    }

    private handleError(errorRes: HttpErrorResponse){

        console.log(errorRes)

        let errorMessage = 'An unknown error occured'
        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }

        switch (errorRes.error.error.message){
            case "INVALID_LOGIN_CREDENTIALS":
                errorMessage = "The credentials are invalid"
                break;
            case "USER_DISABLED":
                errorMessage = "User is disabled"
                break;
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists"
                break;
        }

        return throwError(errorMessage)
    }

    private handleAuthentication(expiresIn: string,email:string, userID: string, token: string){
        const expireTime = new Date(new Date().getTime() +  +expiresIn*1000)
        const newUser = new User(email,
            userID,
            token,
            expireTime
        )
        this.user.next(newUser)
        localStorage.setItem('userData', JSON.stringify(newUser))
        this.autoLogout(+expiresIn * 1000)
    }

}
