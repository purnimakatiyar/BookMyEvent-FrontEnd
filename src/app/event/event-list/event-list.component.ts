import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  eventData: Object[]=[];
  showBooking: boolean = false;
  showAllEvents: boolean = false;
  public loading = false;

  constructor(private route: ActivatedRoute, private eventService: EventService, 
    private authService: AuthService, private toastr: ToastrService, private router: Router) {}


  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {

      if (urlSegments.length && urlSegments[0].path === 'bookevents') {
        this.viewbookEvents();
      }
      else{
        this.fetchEvents();
      }
    });
  }


  fetchEvents(): void {
    if(this.authService.currentUser == 'Customer'){
      this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.loading = false;
        this.eventData = data.events;
        this.showAllEvents = true;
      },
      error: (error) => {
        this.toastr.error('Some Error occurred during fetching events.');
      }}
    );}

    else if(this.authService.currentUser == 'Manager'){
      this.loading = true;
      this.eventService.getUserEvents().subscribe({
        next: (data) => {
          this.loading = false;
          this.eventData = data.events;
          this.showAllEvents = true;
        },
        error: (error) => {
          this.toastr.error('Some Error occurred during fetching events.');
        }}
      );
    }
  }

  showDelete(){
    if(this.authService.currentUser=='Manager'){
      return true;
    }
  }

  showBookEvent(){
    if(this.authService.currentUser =='Customer'){
      return true;
    }
  }


  bookEvent(eventId: string, ticket_qty){

    const bookingDetails = {ticket_qty: ticket_qty};
    
    this.eventService.bookEvent(eventId, bookingDetails).subscribe(
      {next: (data) => {
        this.eventData = data.events;
        this.toastr.success('Successfully Booked Event');
    },

    error: (error) => {
      this.toastr.error('Some Error occurred during booking event.');
    }});
  }

  viewbookEvents():void{
    this.eventService.getbookEvents().subscribe({
      next: (data) => {
        this.eventData = data.bookedevents;
        this.showBooking = true;
      },
      error: (error) => {
        this.toastr.error('Some Error occurred during fetching event.');
      }}
    );
  }

  updateEvent(eventId: string){
    this.router.navigate(['dashboard/manager/update-event'], { state: {eventId: eventId }});
  }


  deleteEvent(eventId: string){
    this.loading = true;
    
    this.eventService.deleteEvent(eventId).subscribe( 
      {next: (data) => {
        this.loading = false;
        this.eventData = data.events;
        this.toastr.success('Successfully Removed Event');
    },
    error: (error) => {
      this.toastr.error('Some Error occurred while removing event.');
    }});
  }
}
