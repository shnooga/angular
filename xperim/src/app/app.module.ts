import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberChildComponent} from "./counter/number-child/number-child.component";
import { NumberParentComponent} from "./counter/number-parent.component";

@NgModule({
  declarations: [
    AppComponent,
    NumberChildComponent,
    NumberParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
