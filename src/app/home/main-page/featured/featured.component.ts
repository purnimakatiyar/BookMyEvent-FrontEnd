import { Component } from '@angular/core';
import { EventService } from '../../../event/services/event.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  eventData: any;
  public loading = false;

  constructor(private router: Router, private eventService: EventService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe(
  {  next:
      (data) => {
        this.loading = false;
        this.eventData = data.events.slice(0, 8);
      },
      error:(error) => {
        this.loading = false;
        this.toastr.error('Error fetching events'); 
      }})
}


showEventDetail(eventId: string) {
  this.router.navigate(['/events/', eventId]);
}

isBook(){
  this.router.navigate(['/login/']);
}

}