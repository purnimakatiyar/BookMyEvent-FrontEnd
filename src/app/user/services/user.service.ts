import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; 
   
    constructor(private http: HttpClient) {}
   
    getManagers(): Observable<any> {
      console.log('get managers request made');
      return this.http.get<any>(`${this.apiUrl}/managers`);
    }
  }