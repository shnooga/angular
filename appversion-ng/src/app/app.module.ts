import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VersionComponent } from "./version/version.component";
import {CountryComponent} from "./country/country.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RadioButtonsComponent} from "./radio-format/radio-format.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    VersionComponent,
    CountryComponent,
    RadioButtonsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

