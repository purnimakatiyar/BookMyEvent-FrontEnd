import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) { }

  onProfile(){
    this.router.navigate(['dashboard/admin/profile']);
  }

  onviewManagers(){
    this.router.navigate(['dashboard/admin/view-managers'])
  }
}
