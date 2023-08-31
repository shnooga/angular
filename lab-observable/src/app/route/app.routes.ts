import {Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {CustomerComponent} from "../customer/customer.component";
import {Customer_ReactComponent} from "../customer/customer_react.component";
import {AuthGuard} from "../guard/auth.guard";

export const AppRoutes:Routes=[
    {path: 'login', component:LoginComponent},
    {path: 'customer', component:CustomerComponent, canActivate:[AuthGuard]},
    {path: 'customer_react', component:Customer_ReactComponent},
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: '**', redirectTo:'', pathMatch:'full'},
];
