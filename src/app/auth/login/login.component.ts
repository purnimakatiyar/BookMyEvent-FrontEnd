import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
 });


 constructor(private authService: AuthService, private router: Router) {}

 onSubmit() {


    if (this.loginForm.valid) {

      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        { 
        next: 
        (response) => {
         
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
        },
        error: (error) => {
          alert('Something went wrong');
        }
      }
      );
    }
 }

  showError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
