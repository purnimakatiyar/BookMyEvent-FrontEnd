import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; 
   
    constructor(private http: HttpClient) {}
   
    getProfile(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/profile`); 
    }
  }