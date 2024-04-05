import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userData: any[] =[];
  role: string = sessionStorage.getItem('role');

 
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getManagers().subscribe({
      next: (data) => {
        this.userData = data.managers;
        console.log(data);
        console.log('Hello');
      },
      error: (error) => {
        console.error('Error fetching managers:', error);
       
      }}
    );
  }

  showDelete(){
    if(this.role=='Admin'){
      return true;
    }
  }

  // deleteEvent(eventId: string){
  //   console.log('in delte event');
  //   this.userService.deleteEvent(eventId).subscribe(  (data) => {
  //     this.eventData = data.events;
  //     console.log(data);
  //     console.log('Hello');
  //   },
    
  //   (error) => {
  //     console.error('Error deleting events:', error);
  //   });
  // }

}