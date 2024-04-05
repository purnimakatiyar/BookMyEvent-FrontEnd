import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeaturedComponent } from './featured/featured.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    FeaturedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
