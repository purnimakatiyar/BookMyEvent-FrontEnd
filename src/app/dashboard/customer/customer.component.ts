import { Component, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EventService } from '../../event/services/event.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  eventData: Object[];
  showBookedEvents: boolean = false;
  constructor(private router: Router, private eventService: EventService) { }

  onProfile(){
    this.router.navigate(['dashboard/customer/profile']);
  }

  onviewEvents(){
    this.router.navigate(['dashboard/customer/all-events']);
  }

  onviewbookEvents(){
    this.showBookedEvents = true;
    
    this.router.navigate(['dashboard/customer/bookevents']);
  }
}
