import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from '../../models/login.model';
import * as constants from '../../shared/constants/regex.constant';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  public loading = false;
  constants = constants.default;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern(this.constants.USERNAME)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.constants.PASSWORD)])
  });
 }

 onSubmit() {

      const loginData: LoginForm = this.loginForm.value;
      this.loading = true;
      this.authService.login(loginData.username, loginData.password).subscribe(
        { 
        next: 
        (response) => {
          this.loading = false;
          this.authService.result = true;

          if(response.role === 'Manager'){

            this.authService.currentUser = 'Manager';
          this.router.navigate(['/dashboard/manager']);
          }
          
          else  if(response.role === 'Customer'){
            this.authService.currentUser = 'Customer';
          this.router.navigate(['/dashboard/customer']);
          }

          else  if(response.role === 'Admin'){
            this.authService.currentUser = 'Admin';
          this.router.navigate(['/dashboard/admin']);
          }
          this.toastr.success("Logged In Successfully");
        },
        error: (error) => {
          this.toastr.error("Wrong Credentials or an Error occured. Please Try Again!");
          this.loginForm.reset();
          this.loading = false;
        }
      }
      );
 }

  showError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  navigateToSignup()
  {
    this.router.navigate(['/signup']);
  }
}
