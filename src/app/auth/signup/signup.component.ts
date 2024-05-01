import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { SignupForm } from '../../models/signup.model';
import * as constants from '../../shared/constants/regex.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
 
 signupForm: FormGroup;
 public loading = false;
  constants = constants.default;
  subscription: Subscription;

 constructor(private signupService: SignupService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(){
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern(this.constants.USERNAME)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.constants.PASSWORD)]),
      name: new FormControl(null, [Validators.required, Validators.pattern(this.constants.NAME)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.constants.PHONE)])
   });
  }
  onSubmit() {
   
      const signupData: SignupForm = this.signupForm.value;
      this.loading = true;
      this.subscription = this.signupService.signup(signupData.username, signupData.password, signupData.name, signupData.phone).subscribe(
        {next:(response) => {
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: error => {
          this.loading = false;
          this.toastr.error("An error occurred, Please Try Again.");
        }}
      );
    
  }

  showError(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
