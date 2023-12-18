import {Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {CustomerComponent} from "../customer/customer.component";
import {AuthGuard} from "../guard/auth.guard";
import {ErrorTestComponent} from "../errortest/errortest.component";
import {ErrorComponent} from "../error/error.component";

export const AppRoutes:Routes=[
    {path: 'error-test', component: ErrorTestComponent},
    {path: 'login', component: LoginComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'customer', component: CustomerComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: '**', redirectTo:'', pathMatch:'full'}
];
