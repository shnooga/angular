import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberParentComponent } from "./counter/number-parent.component";

// const routes: Routes = [];
export const routes: Routes=[
  {path: 'counter', component: NumberParentComponent},
  // {path: 'customer', component:CustomerComponent, canActivate:[AuthGuard]},
  // {path: 'customer_react', component:Customer_ReactComponent},
  {path: '', redirectTo:'counter', pathMatch:'full'},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
