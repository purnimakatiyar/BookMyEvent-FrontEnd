import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  @Input() profileData: any; 
  constructor(private profileService: ProfileService){}
  
  ngOnInit(){
    this.profileService.getProfile()
    .subscribe(
      (data) => {
        this.profileData = data;
      },
    ); 
  }
}
