import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../login/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; //  API endpoint for user authentication
    result: boolean = false;
    user = new BehaviorSubject<User>(null);
    currentUser: string = '';

    constructor(private http: HttpClient, private router: Router) {}
   
    login(username: string, password: string): Observable<any> {
      console.log('login request made');
      return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
        tap((response)=>{
        this.setLogin(username, response);
      }));
    }

    logout(){
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }

    setLogin(username, response){
      sessionStorage.setItem('access_token', response.access_token);
      sessionStorage.setItem('refresh_token', response.refresh_token);
      sessionStorage.setItem('role', response.role);
      const user = new User(username, response.role, response.access_token);
      this.user.next(user);
    }
  }
  