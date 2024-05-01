import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../login/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; 
    result: boolean = false;
    user = new BehaviorSubject<User>(null);
    currentUser: string = '';

    constructor(private http: HttpClient, private router: Router) {}
    
    login(username: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
        tap((response)=>{
        this.setLogin(username, response);
      }));
    }

    
    logout(){
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    setLogin(username, response){
      sessionStorage.setItem('access_token', response.access_token);
      sessionStorage.setItem('refresh_token', response.refresh_token);
      sessionStorage.setItem('role', response.role);
      const user = new User(username, response.role, response.access_token);
      this.user.next(user);
    }

    isLoggedIn(): boolean {
      const accessToken = sessionStorage.getItem('access_token');
      return !!accessToken; 
    }

    isAdmin(): boolean {
      const role = sessionStorage.getItem('role');
      if(role == 'Admin'){
        return true;
      }
      else{
        return false;
      }
    }

    isManager(): boolean{
      const role = sessionStorage.getItem('role');
      if(role == 'Manager'){
        return true;
      }
      else{
        return false;
      }
    }
  }
  