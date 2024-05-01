import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
  ]
})
export class UserModule { }
