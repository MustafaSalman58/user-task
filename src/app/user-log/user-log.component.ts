import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from '../user-data.model';
import { UserService } from '../userService.service';
import { AuthData } from '../auth-data.model';
import { PasswordChecker } from '../password-checker.model';
import { confirmPassword } from '../custom-validator';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {
  newUser = { 'name': '', 'email': '', 'address': '', 'tel': '', 'gender': '', 'password': '', 'id': '' };

  userForm: FormGroup;
  isLoginMode: boolean;
  genders = ['male', 'female'];
  passwordStrength: string;
  passwordColor: string;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const url = (this.route.snapshot.url[0].path)
    console.log(url);
    const currentMode = this.route.snapshot.queryParams['currentMode'];
    if (!currentMode) {
      this.router.navigate(['/signup'], { queryParams: { 'currentMode': 'signup' } });
    }
    this.isLoginMode = url === 'login' ? true : false;
    if (this.isLoginMode) {
      this.userForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
      })

    } else {
      this.userForm = new FormGroup({
        'name': new FormControl(null, [Validators.required,]),
        'email': new FormControl(null, [Validators.required, Validators.email,]),
        'password': new FormControl(null, [Validators.required]),
        'cPassword': new FormControl(null, [Validators.required]),
        'address': new FormControl(null, Validators.required),
        'tel': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required),
      }, [confirmPassword])
      this.userForm.get('password').valueChanges.subscribe(
        (value)=>{
          let passwordStatus = PasswordChecker.getPasswordStatus(value)
          this.passwordStrength = passwordStatus.passwordStrength
          this.passwordColor = passwordStatus.passwordColor;
        }
      )
    }
    
  }

  onSwitchMode() {
    if (this.isLoginMode === true) {
      this.router.navigate(['/signup'], { queryParams: { currentMode: 'signup' } });


    }
    else {
      this.router.navigate(['/login'], { queryParams: { currentMode: 'login' } });
    }

  }

  onSubmit() {
    if (!this.isLoginMode) {
      this.newUser.name = this.userForm.get('name').value
      this.newUser.email = this.userForm.get('email').value
      this.newUser.address = this.userForm.get('address').value
      this.newUser.tel = this.userForm.get('tel').value
      this.newUser.gender = this.userForm.get('gender').value
      this.newUser.password = this.userForm.get('password').value
      this.userService.signupNewUser(this.newUser.email, this.newUser.password).subscribe(
        (resData: AuthData) => {
          this.newUser.id = resData.localId;
      //    console.log(this.newUser.id);
          const user = new UserData(this.newUser.email, this.newUser.password, this.newUser.name, this.newUser.address, this.newUser.tel, this.newUser.gender, this.newUser.id);
          this.userService.addNewProfile(user.userId, user);
        }
      );

      //  this.router.navigate(['/welcome-user']);
    } else {
      const email = this.userForm.get('email').value;
      const password = this.userForm.get('password').value;
      this.userService.loginUser(email, password);


    }

  }



 
}
