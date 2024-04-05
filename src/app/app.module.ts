import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardModule } from 'primeng/card';

import { MenubarModule } from 'primeng/menubar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventModule } from './event/event.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TableModule } from 'primeng/table';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ReactiveFormsModule,
    MenubarModule,
    // FormsModule,
    HttpClientModule,
    UserModule
    // EventModule,
    // DashboardModule,
    // CardModule,
    // TableModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi  : true,
    },
],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
