import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  eventForm = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    eventDate: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    ticketQuantity: new FormControl('', [Validators.required])
 });
  
 constructor(private eventService: EventService, private router: Router) {}

 onSubmit(){
  if (this.eventForm.valid) {
    const eventDetails =
    { event_name:this.eventForm.value.eventName, 
      event_date: this.eventForm.value.eventDate, 
      location: this.eventForm.value.location, 
      price: this.eventForm.value.price, 
      category: this.eventForm.value.category, 
      ticket_qty: this.eventForm.value.ticketQuantity }
  
      console.log(eventDetails);
     this.eventService.addEvent(eventDetails).subscribe(
      { 
      next: 
      (response) => {
        console.log(response.status);
        console.log('event added');
        
      },
      error: (error) => {
        alert('Something went wrong');
      }
    }
    );
  }
 }

  showError(controlName: string): boolean {
    const control = this.eventForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
