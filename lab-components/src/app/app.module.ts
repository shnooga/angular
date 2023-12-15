import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './route/app.routes';
import { HttpClientModule } from '@angular/common/http';
import {CustomerAddComponent} from "./customer/customer-add.component";
import {CustomerListComponent} from "./customer/customer-list.component";
@NgModule({
  declarations: [AppComponent, CustomerComponent, LoginComponent, CustomerAddComponent, CustomerListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
