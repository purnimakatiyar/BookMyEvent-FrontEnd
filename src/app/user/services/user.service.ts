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


//     addEvent(eventDetails: Object): Observable<any>{
//       console.log('add event request made');
//       return this.http.post<any>(`${this.apiUrl}/event`,eventDetails);
//   }

    // deleteUser(eventId: string): Observable<any>{
    //   console.log('delete call');
    //   console.log(eventId);
    //   return this.http.delete<any>(`${this.apiUrl}/events/${eventId}`);
    // }

  }