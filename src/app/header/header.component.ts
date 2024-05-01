import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { filter } from 'rxjs';

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 items: any[] = [];
 showLogin: boolean = true;
 showSignup: boolean = true;

 constructor(private router: Router, private authService: AuthService) {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
      this.showLogin = true;
      this.showSignup = true;

      if (this.router.url.includes('/login')) {
        this.showLogin = false;
      } else if (this.router.url.includes('/signup')) {
        this.showSignup = false;
      }

    });
 }

 loggedIn(){
  if (this.authService.result) {
    this.showLogin = false;
    this.showSignup = false;
      return true;
  }
  else{
    return false;
    }
  }
 

 logout(){
  this.authService.logout();
  sessionStorage.clear();
 }
}
