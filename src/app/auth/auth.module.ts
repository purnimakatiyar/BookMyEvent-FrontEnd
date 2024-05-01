import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { NgxLoadingModule } from 'ngx-loading';


const routes: Routes = [
  
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
     
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: 
    [RouterModule.forChild(routes), 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule, 
    NgxLoadingModule.forRoot({}),],
})
export class AuthModule { }
