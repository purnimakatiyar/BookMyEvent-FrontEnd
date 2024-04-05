import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  eventData: Object[]=[];
  showBooking: boolean = false;
  showAllEvents: boolean = false;
  role: string = sessionStorage.getItem('role');
  
 
  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      console.log(urlSegments[0].path);
      if (urlSegments.length && urlSegments[0].path === 'all-events') {
        this.fetchEvents();
      } else if (urlSegments.length && urlSegments[0].path === 'bookevents') {
        this.viewbookEvents();
      }
    });
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.eventData = data.events;
        console.log(data);
        console.log('Hello');
        this.showAllEvents = true;
      },
      error: (error) => {
        alert('Something went wrong');
      }}
    );
  }

  showDelete(){
    if(this.role=='Manager'){
      return true;
    }
  }
  showBookEvent(){
    if(this.role=='Customer'){
      return true;
    }
  }


  bookEvent(eventId: string){
    this.eventService.bookEvent(eventId).subscribe(  (data) => {
      this.eventData = data.events;
    },

    (error) => {
      console.error('Error deleting events:', error);
    });
  }

  viewbookEvents():void{
    this.eventService.getbookEvents().subscribe({
      next: (data) => {
        this.eventData = data.bookedevents;
        this.showBooking = true;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
       
      }}
    );
  }

  deleteEvent(eventId: string){
   
    this.eventService.deleteEvent(eventId).subscribe(  (data) => {
      this.eventData = data.events;
    },

    (error) => {
      console.error('Error deleting events:', error);
    });
  }
}
