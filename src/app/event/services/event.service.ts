import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; 
   
    constructor(private http: HttpClient) {}
   
    getEvents(): Observable<any> {
      console.log('get events request made');
      return this.http.get<any>(`${this.apiUrl}/events`);
    }

    getEvent(eventId: string): Observable<any> {
        console.log('get a event request made');
        return this.http.get<any>(`${this.apiUrl}/events/${eventId}`);
    }

    addEvent(eventDetails: Object): Observable<any>{
      console.log('add event request made');
      return this.http.post<any>(`${this.apiUrl}/event`,eventDetails);
    }

    getbookEvents(){
        console.log('get book events request made');
        return this.http.get<any>(`${this.apiUrl}/bookevents`);
    }

      bookEvent(eventId: Object): Observable<any>{
        console.log('book event request made');
        return this.http.post<any>(`${this.apiUrl}/bookevents/${eventId}`, {'ticket_qty': 2});
      }

      deleteEvent(eventId: string): Observable<any>{
        console.log('delete call');
        console.log(eventId);
        return this.http.delete<any>(`${this.apiUrl}/events/${eventId}`);
      }

      

  }