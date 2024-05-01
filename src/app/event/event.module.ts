import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventItemComponent } from './event-list/event-item/event-item.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  {path: 'events', component: EventListComponent},
  {path: 'events/:eventId', component: EventItemComponent},
  {path: 'add-event', component: EventFormComponent},
  {path: 'update-event', component: EventFormComponent}

]

@NgModule({
  declarations: [
    EventListComponent,
    EventFormComponent,
    EventItemComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi  : true,
    },
  ]

})
export class EventModule { }
