import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService.service';
import { UserData } from '../user-data.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandeactivateGuard } from '../candeactivate-guard.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, CandeactivateGuard {
  changesSaved: boolean = false;
  genders = ['male', 'female']
userProfileData: UserData;
userForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(
      (userData)=>{
        this.userProfileData = userData;
        console.log(userData.name);
      }
    );
    if(this.userProfileData){
      this.userForm = new FormGroup({
        'name': new FormControl(this.userProfileData.name, Validators.required),
        'email': new FormControl(this.userProfileData.email, [Validators.email,]),
        'address': new FormControl(this.userProfileData.address, Validators.required),
        'tel': new FormControl(this.userProfileData.tel, Validators.required),
        'gender': new FormControl(this.userProfileData.gender, Validators.required),
      })
    }
    
  }

  onSave(){
    this.changesSaved = true
    if(this.userProfileData){
      const userName = this.userForm.get('name').value
      const email = this.userForm.get('email').value
      const address = this.userForm.get('address').value
      const tel = this.userForm.get('tel').value
      const gender = this.userForm.get('gender').value
      const updatedUser = new UserData(email,this.userProfileData.password, userName, address, tel, gender, this.userProfileData.userId);
      this.userService.updateUserProfile(this.userProfileData.userId, updatedUser).subscribe(()=>{
        this.router.navigate(['/welcome-user']);
      })
    }
    console.log(this.userForm);
  }

  canComponentDeactivate(){
    if(!this.changesSaved && (this.userProfileData.name !== this.userForm.get('name').value)){
      return confirm('Do you want to dicard changes?');
    }else{
      return true;
    }
  }

}
