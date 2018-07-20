import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoomCalcFormComponent} from './boom-calc-form/boom-calc-form.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobViewComponent } from './job-view/job-view.component';
import { JobFormComponent } from './job-form/job-form.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobSearchComponent } from './job-search/job-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    BoomCalcFormComponent,
    JobsComponent,
    JobViewComponent,
    JobFormComponent,
    MessagesComponent,
    DashboardComponent,
    JobSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
