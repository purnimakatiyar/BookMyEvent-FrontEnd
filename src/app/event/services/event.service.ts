import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'https://bookmyevent-v3.onrender.com'; 
    
    constructor(private http: HttpClient) {}
   
    getEvents(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/events`);
    }

    getUserEvents(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/managers/events`);
    }

    getEvent(eventId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/events/${eventId}`);
    }

    addEvent(eventDetails: Object): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/event`,eventDetails);
    }

    updateEvent(eventId: string, eventDetails){
      return this.http.put<any>(`${this.apiUrl}/events/${eventId}`,eventDetails);
    }

    getbookEvents(){
        return this.http.get<any>(`${this.apiUrl}/bookevents`);
    }

    bookEvent(eventId: Object, bookingDetails): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/bookevents/${eventId}`, bookingDetails);
    }

    deleteEvent(eventId: string): Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/events/${eventId}`);
    }

  }