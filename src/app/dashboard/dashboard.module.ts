import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { EventFormComponent } from '../event/event-form/event-form.component';
import { EventModule } from '../event/event.module';
import { ProfileComponent } from './profile/profile.component';
import { EventListComponent } from '../event/event-list/event-list.component';
import { UserListComponent } from '../user/user-list/user-list.component';


const routes: Routes = [
  
  {path: 'admin',children: [
        {path: '',component: AdminComponent},
        {path: 'view-managers',component: UserListComponent},
        {path: 'profile', component: ProfileComponent},
        ],},
  {path: 'customer', children: [
        {path: '', component: CustomerComponent},
        {path: 'all-events', component: EventListComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'bookevents', component: EventListComponent}
  ],},
  {path: 'manager', children: [
        {path: '', component: ManagerComponent},
        {path: 'add-event', component: EventFormComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'view-events', component: EventListComponent},
  ]
  },
]

@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    CustomerComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardModule,
    EventModule
  ],
})
export class DashboardModule { }
