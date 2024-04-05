import { Component } from '@angular/core';
import { EventService } from '../../../event/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  eventData: any;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.eventData = data.events.slice(0, 9);
        console.log(data);
        console.log('Hello');
      },
      (error) => {
        console.error('Error fetching events:', error);
       
      })
}


showEventDetail(eventId: string) {
 
  this.router.navigate(['/events/', eventId]);

}
}