import {NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {NumberParentComponent } from "./counter/number-parent.component";
import {InputDemoComponent} from "./input/input-demo.component";
import {CheckboxDemoComponent} from "./input/checkbox-demo.component";
import {FormgroupDemoComponent} from "./input/formgroup-demo.component";
import {FormbuilderDemoComponent} from "./input/formbuilder-demo.component";

export const routes: Routes=[
  {path: 'counter', component: NumberParentComponent},
  {path: 'input', component: InputDemoComponent},
  {path: 'checkbox', component: CheckboxDemoComponent},
  {path: 'formgroup', component: FormgroupDemoComponent},
  {path: 'formbuilder', component: FormbuilderDemoComponent},
  {path: '', redirectTo: 'counter', pathMatch: 'full'},
  // {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
