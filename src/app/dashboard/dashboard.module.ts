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
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { adminGuard } from '../guards/admin.guard';
import { managerGuard } from '../guards/manager.guard';
import { NgxLoadingModule } from 'ngx-loading';


const routes: Routes = [
  
  {path: 'admin', canActivate: [adminGuard], children: [
        {path: '',component: AdminComponent},
        {path: 'view-managers',component: UserListComponent},
        {path: 'profile', children: [
          {path: '', component: ProfileComponent},
          {path: 'update-profile', component: UpdateProfileComponent},
      ]},
        ],  },

  {path: 'customer', children: [
        {path: '', component: CustomerComponent},
        {path: 'all-events', component: EventListComponent},
        {path: 'profile', children: [
          {path: '', component: ProfileComponent},
          {path: 'update-profile', component: UpdateProfileComponent},
      ]},
        {path: 'bookevents', component: EventListComponent},
       
  ],},
  
  {path: 'manager', canActivate: [managerGuard], children: [
        {path: '', component: ManagerComponent},
        {path: 'add-event', component: EventFormComponent},
        {path: 'profile', children: [
            {path: '', component: ProfileComponent},
            {path: 'update-profile', component: UpdateProfileComponent},
        ]},
        {path: 'view-events', component: EventListComponent},
        {path: 'update-event', component: EventFormComponent},
  ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    CustomerComponent,
    ProfileComponent,
    UpdateProfileComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardModule,
    EventModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
  ],
})
export class DashboardModule { }
