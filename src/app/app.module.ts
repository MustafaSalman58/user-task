import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLogComponent } from './user-log/user-log.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginInterceptorService } from './login-interceptor.service';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuardService } from './auth.guard.service';
import { CandeactivateGuardService } from './candeactivate-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'signup' , pathMatch: 'full' },
  { path: 'signup', component: UserLogComponent },
  { path: 'login', component: UserLogComponent },
  { path: 'welcome-user', canActivate: [AuthGuardService] , component: WelcomeUserComponent },
  { path: 'edit-profile', canActivate: [AuthGuardService] ,component: EditProfileComponent, canDeactivate: [CandeactivateGuardService] },

]

@NgModule({
  declarations: [
    AppComponent,
    UserLogComponent,
    WelcomeUserComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
