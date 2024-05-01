import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../../models/profile.model';
import * as constants from '../../../shared/constants/regex.constant';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit{
  visible:boolean = true;
  updateProfileForm: FormGroup;
  constants = constants.default;
  @Input() profile: Profile;
 
 constructor(private profileService: ProfileService, private router: Router, 
  private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      name: new FormControl(null, [Validators.pattern(this.constants.NAME)]),
      phone: new FormControl(null, [Validators.pattern(this.constants.PHONE)])
   });
  
  }

  onSubmit() {
    
      const profileDetails = {
        name: this.updateProfileForm.value.name,
        phone: this.updateProfileForm.value.phone,
      };
  
    
      Object.keys(profileDetails).forEach(key => !profileDetails[key] && delete profileDetails[key]);
    
      console.log("Hello");
      console.log(profileDetails);

      this.profileService.updateProfile(profileDetails).subscribe(
        {next: (response) => {
         this.navigateToRoute();
         this.toastr.success('Updated Profile Successfully');
        },
        error: error => {
          this.toastr.error("An error occurred!");
        }}
      );
    
  }

  close(){
    this.visible = false;
    this.navigateToRoute();
  }

  navigateToRoute(){
    if(this.authService.currentUser == 'Admin'){
      this.router.navigate(['dashboard/admin/profile']);
      }

    if(this.authService.currentUser == 'Manager'){
    this.router.navigate(['dashboard/manager/profile']);
    }
    else if(this.authService.currentUser == 'Customer'){
      this.router.navigate(['dashboard/customer/profile']);
    }
  }

}
