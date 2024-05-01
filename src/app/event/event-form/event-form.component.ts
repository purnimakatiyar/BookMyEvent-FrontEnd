import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { CustomDatePipeService } from '../services/date-pipe.service';
import { EventForm } from '../../models/event.model';
import { ToastrService } from 'ngx-toastr';
import * as constants from '../../shared/constants/regex.constant';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit{
  constants= constants.default;
  eventForm: FormGroup;
  visible: boolean = true;
  eventId: string;

 constructor(private route: ActivatedRoute, private eventService: EventService, 
      private customDatePipe: CustomDatePipeService,
       private toastr: ToastrService, private router: Router) {
 }

 ngOnInit(): void {
  this.eventForm = new FormGroup({
    eventName: new FormControl(null, [Validators.required, Validators.pattern(this.constants.NAME)]),
    eventDate: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required, Validators.pattern(this.constants.LOCATION)]),
    price: new FormControl(null, [Validators.required, Validators.pattern(this.constants.PRICE)]),
    category: new FormControl(null, [Validators.required, Validators.pattern(this.constants.CATEGORY)]),
    ticketQuantity: new FormControl(null, [Validators.required, Validators.pattern(this.constants.TICKETS)])
 });
 }


 onClick() {
  const urlSegments = this.route.snapshot.url;

  if (urlSegments.length > 0) {
    const path = urlSegments[0].path;
    console.log(path);
      if(path == 'add-event'){
        this.onSubmit();
      }
      else{
        this.onUpdate();
      }
  } 
}

 onSubmit(){

    const formattedDate = this.customDatePipe.transform(this.eventForm.value.eventDate);
    this.eventForm.value.eventDate = formattedDate;
    console.log(this.eventForm.value.eventDate);
    
    const eventDetails: EventForm = this.eventForm.value;
      console.log(eventDetails);
      this.eventService.addEvent(eventDetails).subscribe(
      { 
      next: 
      (response) => {
        this.toastr.success('Event added successfully');
      },
      error: (error) => {
        this.toastr.error('Something went wrong, Please try again!');
      }
    }
    );
  
 }

 onUpdate() {

    const formattedDate = this.customDatePipe.transform(this.eventForm.value.eventDate);
    const eventDetails = {
      event_name: this.eventForm.value.eventName,
      event_date: formattedDate,
      location: this.eventForm.value.location,
      price: this.eventForm.value.price,
      category: this.eventForm.value.category,
      ticket_qty: this.eventForm.value.ticketQuantity
    };

   
    Object.keys(eventDetails).forEach(key => !eventDetails[key] && delete eventDetails[key]);
   
    this.eventService.updateEvent(this.eventId, eventDetails).subscribe({
      next: (response) => {
        this.toastr.success('Event updated successfully');
      },
      error: (error) => {
        this.toastr.error('Something went wrong, Please try again!');
      }
    });
}


  showError(controlName: string): boolean {
    const control = this.eventForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  close(){
    this.visible = false;
    this.router.navigate(['dashboard/manager']);
  }
}
