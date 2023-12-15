import {Component} from '@angular/core';
import {Customer} from "../model/customer"
import {CustomerService} from "../services/customer.service";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  providers: [CustomerService]
})

export class CustomerComponent {
  IsAddNew$: Observable<boolean>;
  Customers$: Observable<Array<Customer>>;
  LoginUserFirstName:string;

  constructor(private custService : CustomerService, private authService : AuthenticationService) {
    const decodedToken:any = jwt_decode(localStorage?.['token']);
    this.LoginUserFirstName = decodedToken.firstName;
    this.IsAddNew$ = this.custService.IsAddNew$;
    this.Customers$ = this.custService.Customers$;
  }

  Save(c: Customer){
    this.custService.Save(c);
  }

  Cancel(){
    this.custService.setList();
  }

  AddNew() {
    this.custService.setAddNew();
  }

  logout() {
    this.authService.logout();
  }
}
