import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  constructor(private router: Router) { }

  onProfile(){
    this.router.navigate(['dashboard/manager/profile']);
  }

  onaddEvent(){
    this.router.navigate(['dashboard/manager/add-event']);
  }

  onviewEvents(){
    this.router.navigate(['dashboard/manager/view-events'])
  }
}
