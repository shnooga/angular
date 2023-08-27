import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NumberChildComponent} from "./counter/number-child/number-child.component";
import {NumberParentComponent} from "./counter/number-parent.component";
import {InputDemoComponent} from "./input/input-demo.component";
import {CheckboxDemoComponent} from "./input/checkbox-demo.component";
import {FormgroupDemoComponent} from "./input/formgroup-demo.component";
import {FormbuilderDemoComponent} from "./input/formbuilder-demo.component";

@NgModule({
  declarations: [
    AppComponent,
    NumberChildComponent,
    NumberParentComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    FormgroupDemoComponent,
    FormbuilderDemoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
