import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com';
    
    constructor(private http: HttpClient) {}
   
    signup(username: string, password: string, name: string, phone: string): Observable<any> {
      console.log('signup request made');
      return this.http.post<any>(`${this.apiUrl}/signup`, { username, password, name, phone });
    }
  }
  