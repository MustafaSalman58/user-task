import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService.service';
import { UserData} from '../user-data.model';
import { AuthData } from '../auth-data.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  loggedUser: UserData = null;
  isAuth: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.auth.pipe(take(1)).subscribe(
      (auth: AuthData) => {
        this.isAuth = !!auth;
        console.log(this.isAuth);
        if (this.isAuth) {
          this.userService.getUserProfile(auth.localId).pipe(take(1)).subscribe(
            resData=>{
              console.log(auth.localId);
              console.log(resData);
              for (const key in resData) {
                if (resData.hasOwnProperty(key)) {
                  const element = resData[key];
                  console.log(element);
                  this.loggedUser = element;
                  this.userService.userData.next(this.loggedUser);
                }
              }
            }
          )
        }
      }
    );
  }

}
