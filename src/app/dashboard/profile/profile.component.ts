import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  public loading = false;
  profileData: Profile; 
  updateClicked: boolean = false;
  subscription: Subscription;
  role: string = sessionStorage.getItem('role');

  constructor(private profileService: ProfileService, private router: Router, 
    private authService: AuthService, private toastr: ToastrService, private activeRoute: ActivatedRoute){}
  
  ngOnInit(){
    this.loading = true;
    console.log(this.authService.currentUser);
   this.subscription = this.profileService.getProfile()
    .subscribe(
      {next:
      (data) => {
        this.loading = false;
        this.profileData = data;
      },
      error: (error)=>{
        this.toastr.error("Something went wrong!");
      }}
    ); 
  }

  updateProfile(){
    this.updateClicked = true;

    if(this.authService.currentUser == 'Admin'){
    this.router.navigate(['/dashboard/admin/profile/update-profile']);
  }
  if(this.authService.currentUser == 'Manager'){
    this.router.navigate(['/dashboard/manager/profile/update-profile']);
  }
  if(this.authService.currentUser == 'Customer'){
    this.router.navigate(['/dashboard/customer/profile/update-profile']);
  }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
