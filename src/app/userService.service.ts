import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { tap } from 'rxjs/operators';
import { UserData } from './user-data.model';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private router: Router) { }
    auth = new BehaviorSubject<AuthData>(null);
    userData = new BehaviorSubject<UserData>(null);

    signupNewUser(userEmail: string, userPassword: string) {
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsvVlGouTzYfZVtcqgL3uczkXWxJIZEuQ', {

            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
        }).pipe(tap(
            (resData: AuthData) => {
                const newAuth = new AuthData(resData.idToken, resData.email, resData.refreshToken, resData.expiresIn, resData.localId);
                this.auth.next(newAuth);
            }
        ))
    }

    loginUser(userEmail: string, userPassword: string) {
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsvVlGouTzYfZVtcqgL3uczkXWxJIZEuQ', {
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
        }).pipe(tap(
            (resData: AuthData) => {
                const newAuth = new AuthData(resData.idToken, resData.email, resData.refreshToken, resData.expiresIn, resData.localId);
                this.auth.next(newAuth);
            }
        )).subscribe(resData => {
            this.router.navigate(['/welcome-user']);
        })
    }

    addNewProfile(userId: string, userProfile: UserData) {
        this.http.post('https://user-task-8a06a.firebaseio.com/profils/'+userId+'.json', 
            userProfile
        ).subscribe(res=>{
            console.log(res);
            this.router.navigate(['/welcome-user']);
        })
    }

    getUserProfile(userId: string){
       return this.http.get<{[key: string]: UserData}>('https://user-task-8a06a.firebaseio.com/profils/'+userId+'.json');
    }

    updateUserProfile(userId: string, userProfile: UserData){
       return this.http.put('https://user-task-8a06a.firebaseio.com/profils/'+userId+'.json',
        {userProfile});
    }

}