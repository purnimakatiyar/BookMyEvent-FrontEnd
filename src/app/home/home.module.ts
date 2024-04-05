import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './main-page/featured/featured.component';
import { AboutComponent } from './main-page/about/about.component';
import { EventModule } from '../event/event.module';
import { EventItemComponent } from '../event/event-list/event-item/event-item.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'events/:eventId', component: EventItemComponent}
  
]

@NgModule({
  declarations: [
    MainPageComponent,
    FeaturedComponent,
    AboutComponent,
 
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EventModule
  ]
})
export class HomeModule { }
