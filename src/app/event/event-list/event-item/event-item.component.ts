import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent implements OnInit{
  @Input() eventData: any;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    console.log('In event item ngoninit');
    this.eventService.getEvent(eventId) 
        .subscribe(
          (data) => (this.eventData = data)
        ); 
  }
}
