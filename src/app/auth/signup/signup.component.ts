import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
 });

 constructor(private signupService: SignupService, private router: Router) {}
  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password, name, phone } = this.signupForm.value;

      this.signupService.signup(username, password, name, phone).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        error => {
          alert('Something went wrong');
        }
      );
    }
  }
  showError(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
